import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const EnablePromptAPI = () => {

	const theme = useTheme();
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
		},
		question: {
			fontSize: 18,
			fontWeight: 'bold',
			marginVertical: 10,
		},
		answer: {
			fontSize: 16,
			marginBottom: 5,
			padding: 5,
			borderRadius: 5,
		},
		sectionTitle: {
			fontWeight: 'bold',
			fontSize: 16,
		},
		step: {
			fontSize: 16,
			marginVertical: 5,
			padding: 5,
			borderRadius: 5,
		},
		link: {
			textDecorationLine: 'underline',
			textDecorationColor: theme.colors.accent,
			marginBottom: 5,
		},
	});

	return (
		<View style={styles.container}>
			<Text style={styles.question}>How do I enable Prompt API (Language Models) in my browser?</Text>
			<Text style={styles.answer}>To enable language models in your browser, follow these steps:</Text>

			<ol>
				<li style={{ marginBottom: 10 }}>
					<Text style={styles.sectionTitle}>Check Chrome Compatibility</Text>
					<ol type="i">
						<li>
							<Text style={styles.step}>
								Ensure you are using Chrome version 129 or higher. The latest AI features will work best in Chrome Canary or Dev channel.
							</Text>
							<Text variant='bodySmall'>
								<ul>
									<li>You can check your version by clicking on the three dots in the top right corner, then <Text style={{ fontStyle: 'italic' }}>'Help' &gt; 'About Google Chrome'</Text>.</li>
									<li>Look for the version number in the format: <Text style={{ fontStyle: 'italic' }}>Version 132.0.6834.83</Text>.</li>
									<li>Make sure the first number (major version) is 129 or greater.</li>
									<li>(optional) Download Chrome Canary from <Text style={{ fontStyle: 'italic' }}>google.com/chrome/canary/</Text> for the best experience.</li>
								</ul>
							</Text>

						</li>
						<li>
							<Text style={styles.step}>
								If your version is below 129, update Chrome by going to <Text style={{ fontStyle: 'italic' }}>'Help' &gt; 'About Google Chrome'</Text> and following the prompts to update, or install Chrome Canary.
							</Text>
						</li>
					</ol>
				</li>

				<li style={{ marginBottom: 10 }}>
					<Text style={styles.sectionTitle}>Enable the Prompt API Flags</Text>
					<ol type='i'>
						<li>
							<Text style={styles.step}>
								Go to <Text style={styles.link} onPress={() => Linking.openURL('chrome://flags')}>chrome://flags</Text> in your browser.
							</Text>
						</li>
						<li>
							<Text style={styles.step}>
								Search for "Prompt API" and enable the relevant flags.
							</Text>
						</li>
						<li>
							<Text style={styles.step}>
								Also search for "optimization guide on device model" and set it to "Enabled BypassPerfRequirement".
							</Text>
						</li>
						<li>
							<Text style={styles.step}>
								Restart your browser for the changes to take effect.
							</Text>
						</li>
						<li>
							<Text style={styles.step}>
								After restarting, the LanguageModel API should be available. You can verify it in the DevTools console:
							</Text>
							<Text variant='bodySmall'>
								<ul>
									<li>Open DevTools console (press F12 or right-click → Inspect)</li>
									<li>Type: <Text style={{ fontStyle: 'italic' }}>window.LanguageModel</Text></li>
									<li>If it shows a class/constructor, the API is available and ready to use.</li>
									<li>If it returns <Text style={{ fontStyle: 'italic' }}>undefined</Text>, double-check the flags and Chrome version.</li>
								</ul>
							</Text>
						</li>
					</ol>
				</li>

				<li style={{ marginBottom: 10 }}>
					<Text style={styles.sectionTitle}>Additional Resources</Text><br />
					<Text style={styles.step}>For more information, visit the following links:</Text>
					<ol type='i'>
						<li>
							<Text style={styles.link} onPress={() => Linking.openURL('https://github.com/webmachinelearning/prompt-api/blob/main/README.md')}>
								Prompt API Documentation
							</Text>
						</li>
						<li>
							<Text style={styles.link} onPress={() => Linking.openURL('https://developer.chrome.com/docs/ai/get-started')}>
								Getting Started with AI in Chrome
							</Text>
						</li>
						<li>
							<Text style={styles.link} onPress={() => Linking.openURL('https://ai.google.dev/gemini-api/docs/models/generative-models')}>
								Gemini API Documentation
							</Text>
						</li>
					</ol>
				</li>
			</ol>
		</View>
	);
};

export default EnablePromptAPI;
