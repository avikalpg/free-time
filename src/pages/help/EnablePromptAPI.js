import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';


const EnablePromptAPI = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Help Page</Text>
			<Text style={styles.question}>How to Enable Prompt-API in Your Browser?</Text>
			<Text style={styles.answer}>To enable Prompt-API in your browser, follow these steps:</Text>
			<Text style={styles.step}>1. Open your browser settings.</Text>
			<Text style={styles.step}>2. Navigate to the 'Privacy and Security' section.</Text>
			<Text style={styles.step}>3. Find 'Site Settings' or 'Content Settings'.</Text>
			<Text style={styles.step}>4. Look for 'JavaScript' and ensure it is enabled.</Text>
			<Text style={styles.step}>5. Restart your browser for the changes to take effect.</Text>
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
	step: {
		fontSize: 18,
		marginVertical: 5,
	},
});

export default EnablePromptAPI;