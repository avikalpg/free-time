/**
 * relay.js — Client for the byok-relay server.
 *
 * Handles user registration, API key storage, and AI message sending.
 * The relay token and selected provider are persisted in localStorage.
 *
 * Relay URL: https://relay.myfreetimeinaweek.in
 */

const RELAY_URL = 'https://relay.myfreetimeinaweek.in';
const APP_ID = 'free-time';
const STORAGE_KEY_TOKEN = 'byok_relay_token';
const STORAGE_KEY_PROVIDER = 'byok_provider';

// ── Token management ────────────────────────────────────────────────────────

async function getOrCreateToken() {
    if (typeof localStorage === 'undefined') return null;
    let token = localStorage.getItem(STORAGE_KEY_TOKEN);
    if (token) return token;

    const res = await fetch(`${RELAY_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_id: APP_ID }),
    });
    if (!res.ok) throw new Error('Failed to register with relay');
    const data = await res.json();
    localStorage.setItem(STORAGE_KEY_TOKEN, data.token);
    return data.token;
}

// ── Key management ──────────────────────────────────────────────────────────

export async function storeApiKey(provider, apiKey) {
    const token = await getOrCreateToken();
    const res = await fetch(`${RELAY_URL}/keys/${provider}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-relay-token': token,
        },
        body: JSON.stringify({ key: apiKey }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to store key (${res.status})`);
    }
    return res.json();
}

export async function listStoredProviders() {
    try {
        const token = await getOrCreateToken();
        const res = await fetch(`${RELAY_URL}/keys`, {
            headers: { 'x-relay-token': token },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.providers || [];
    } catch {
        return [];
    }
}

export async function deleteApiKey(provider) {
    const token = await getOrCreateToken();
    const res = await fetch(`${RELAY_URL}/keys/${provider}`, {
        method: 'DELETE',
        headers: { 'x-relay-token': token },
    });
    return res.ok;
}

// ── Provider / session persistence ─────────────────────────────────────────

export function getSelectedProvider() {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEY_PROVIDER);
}

export function setSelectedProvider(provider) {
    if (typeof localStorage === 'undefined') return;
    if (provider) {
        localStorage.setItem(STORAGE_KEY_PROVIDER, provider);
    } else {
        localStorage.removeItem(STORAGE_KEY_PROVIDER);
    }
}

// ── AI chat ─────────────────────────────────────────────────────────────────

const PROVIDER_CONFIGS = {
    anthropic: {
        path: '/v1/messages',
        buildBody: (messages, systemPrompt) => ({
            model: 'claude-haiku-3-5-20241022',
            max_tokens: 1024,
            system: systemPrompt,
            messages: messages
                .filter(m => m.role === 'user' || m.role === 'assistant')
                .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
            stream: true,
        }),
        buildHeaders: () => ({
            'anthropic-version': '2023-06-01',
        }),
        parseStreamChunk: (line) => {
            if (!line.startsWith('data: ')) return null;
            const data = line.slice(6).trim();
            if (data === '[DONE]' || !data) return null;
            try {
                const json = JSON.parse(data);
                // Anthropic streaming: content_block_delta
                return json?.delta?.text || null;
            } catch { return null; }
        },
    },

    google: {
        path: '/v1beta/models/gemini-2.0-flash:streamGenerateContent',
        buildBody: (messages, systemPrompt) => ({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: messages
                .filter(m => m.role === 'user' || m.role === 'assistant')
                .map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }],
                })),
            generationConfig: { maxOutputTokens: 1024 },
        }),
        buildHeaders: () => ({}),
        // Gemini returns a JSON array of events, not SSE
        parseStreamChunk: (line) => {
            if (!line.startsWith('data: ')) return null;
            const data = line.slice(6).trim();
            if (!data) return null;
            try {
                const json = JSON.parse(data);
                return json?.candidates?.[0]?.content?.parts?.[0]?.text || null;
            } catch { return null; }
        },
    },
};

const SYSTEM_PROMPT = `You are a time management coach. Keep ALL responses to 2-3 sentences maximum. Focus on asking clarifying questions rather than giving prescriptive advice. Be conversational, empathetic, and Socratic. Help users discover insights about their time allocation through guided questions. Never give long lists or detailed plans unless explicitly asked. Think like a human coach in a conversation, not a report writer. Always start from the end goal - if you are not exactly clear about what that goal means, ask clarifying question about that first. Next, try to find out how do the current time commitments align with that goal. If the commitment listed are vague, ask clarifying questions first. Your goal is to help the user prioritise the right activities in their life so that they are able to achieve their goal without compromising on interim happiness.`;

/**
 * Send a message via the relay and stream the response.
 *
 * @param {string} provider - 'anthropic' | 'google'
 * @param {Array} messages - Chat history [{role, content}]
 * @param {function} onChunk - Called with each text chunk as it streams
 * @param {function} onDone - Called when streaming is complete
 * @param {function} onError - Called with an error message string
 */
export async function sendRelayMessage(provider, messages, onChunk, onDone, onError) {
    const config = PROVIDER_CONFIGS[provider];
    if (!config) {
        onError(`Unsupported provider: ${provider}`);
        return;
    }

    let token;
    try {
        token = await getOrCreateToken();
    } catch (e) {
        onError('Could not connect to relay. Check your internet connection.');
        return;
    }

    const body = config.buildBody(messages, SYSTEM_PROMPT);
    const extraHeaders = config.buildHeaders();

    try {
        const res = await fetch(`${RELAY_URL}/relay/${provider}${config.path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-relay-token': token,
                ...extraHeaders,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            onError(err.error || `AI request failed (${res.status})`);
            return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
                const text = config.parseStreamChunk(line);
                if (text) onChunk(text);
            }
        }
        onDone();
    } catch (e) {
        onError(`Connection error: ${e.message}`);
    }
}
