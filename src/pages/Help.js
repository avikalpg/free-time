import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import EnablePromptAPI from './help/EnablePromptAPI';
import { useTheme } from 'react-native-paper';

const HelpSupport = () => {
	const [activeTab, setActiveTab] = useState('enablePromptAPI');

	const theme = useTheme();
	// Styles
	const styles = {
		title: {
			fontSize: 24,
			fontWeight: 'bold',
			marginTop: 20,
			marginBottom: 20,
			textAlign: 'center',
			width: '100%',
		},
		container: {
			flex: 1,
			flexDirection: 'row',
			minHeight: '75vh',
		},
		tabContainer: {
			width: '30%', // Adjust width as needed
			padding: 10,
			backgroundColor: theme.colors.surface,
			borderRadius: 10,
			marginRight: 10,
		},
		tab: {
			fontSize: 16,
			padding: 10,
			color: theme.colors.primary,
		},
		activeTab: {
			fontSize: 16,
			padding: 10,
			fontWeight: 'bold',
			backgroundColor: theme.colors.accent,
			borderRadius: 10,
			marginRight: 10,
		},
		contentArea: {
			width: '70%', // Adjust width as needed
			padding: 20,
		},
		step: {
			fontSize: 16,
			marginVertical: 5,
			padding: 10,
			backgroundColor: theme.colors.surface,
			borderRadius: 5,
		},
		question: {
			fontSize: 18,
			fontWeight: 'bold',
			marginVertical: 10,
		},
		answer: {
			fontSize: 16,
			marginBottom: 15,
			padding: 10,
			backgroundColor: theme.colors.surface,
			borderRadius: 5,
		},
		contact: {
			marginTop: 20,
			fontSize: 16,
			textAlign: 'center',
			color: theme.colors.text,
		},
	};

	return (
		<View >
			<Text style={styles.title}>Help & Support</Text>
			<View style={styles.container}>
				<View style={styles.tabContainer}>
					<TouchableOpacity onPress={() => setActiveTab('enablePromptAPI')}>
						<Text style={activeTab === 'enablePromptAPI' ? styles.activeTab : styles.tab}>How to enable PromptAPI in my browser?</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setActiveTab('freeTimeCalculator')}>
						<Text style={activeTab === 'freeTimeCalculator' ? styles.activeTab : styles.tab}>How to use the free time calculator?</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setActiveTab('bestPractices')}>
						<Text style={activeTab === 'bestPractices' ? styles.activeTab : styles.tab}>Best practices for getting suggestions for free time.</Text>
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.contentArea}>
					{activeTab === 'enablePromptAPI' && (
						<EnablePromptAPI />
					)}
					{activeTab === 'freeTimeCalculator' && (
						<View>
							<Text style={styles.question}>How to use the free time calculator?</Text>
							<Text style={styles.answer}>[Provide a brief answer or link to a detailed guide.]</Text>
						</View>
					)}
					{activeTab === 'bestPractices' && (
						<View>
							<Text style={styles.question}>Best practices for getting suggestions for free time.</Text>
							<Text style={styles.answer}>[Provide a brief answer or link to a detailed guide.]</Text>
						</View>
					)}
				</ScrollView>
			</View>
			<Text style={styles.contact}>Contact Support: [Provide contact information]</Text>
		</View>
	);
};

export default HelpSupport;