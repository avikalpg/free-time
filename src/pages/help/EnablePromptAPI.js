import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text } from 'react-native-paper';

const EnablePromptAPI = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Help Page</Text>
			<Text style={styles.question}>How to Enable Language Models in Your Browser?</Text>
			<Text style={styles.answer}>To enable language models in your browser, follow these steps:</Text>

			<ol>
				<li>
					<Text style={styles.sectionTitle}>Check Chrome Compatibility</Text>
					<ol>
						<li>
							<Text style={styles.step}>
								Ensure you are using <Text style={{ fontWeight: 'bold' }}>Chrome version 92 or higher</Text>.
								You can check your version by clicking on the three dots in the top right corner, then <Text style={{ fontStyle: 'italic' }}>'Help' &gt; 'About Google Chrome'</Text>.
								Look for the version number in the format: <Text style={{ fontStyle: 'italic' }}>Version 132.0.6834.83 (Official Build) (arm64)</Text>.
								Make sure the first number (major version) is 92 or greater.
							</Text>
						</li>
						<li>
							<Text style={styles.step}>
								If your version is below 92, update Chrome by going to <Text style={{ fontStyle: 'italic' }}>'Help' &gt; 'About Google Chrome'</Text> and following the prompts to update.
							</Text>
						</li>
					</ol>
				</li>

				<li>
					<Text style={styles.sectionTitle}>Enable the Prompt API Flag</Text>
					<ol>
						<li>
							<Text style={styles.step}>
								Go to <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('chrome://flags')}>chrome://flags</Text> in your browser.
							</Text>
						</li>
						<li>
							<Text style={styles.step}>
								Search for "Prompt API" and enable the relevant flags.
							</Text>
						</li>
						<li>
							<Text style={styles.step}>
								Restart your browser for the changes to take effect.
							</Text>
						</li>
						<li>
							<Text style={styles.step}>
								Confirm that the AI capabilities are available by typing <Text style={{ fontStyle: 'italic' }}>(await ai.assistant.capabilities()).available;</Text> in DevTools console.
							</Text>
						</li>
					</ol>
				</li>

				<li>
					<Text style={styles.sectionTitle}>Additional Resources</Text>
					<Text style={styles.step}>For more information, visit the following links:</Text>
					<ol>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	step: {
		marginBottom: 10,
	},
	link: {
		color: 'blue',
		textDecorationLine: 'underline',
		marginBottom: 5,
	},
});

export default EnablePromptAPI;