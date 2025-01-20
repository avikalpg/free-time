import React from 'react';
import merge from 'deepmerge';
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import { useState } from 'react';
import EnablePromptAPI from './help/EnablePromptAPI';
import { useTheme } from 'react-native-paper';
import { useStylesheet } from 'react-native-responsive-ui';

const HelpSupport = () => {
	const [activeTab, setActiveTab] = useState('enablePromptAPI');

	const theme = useTheme();
	// Styles
	const commonStyles = {
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
			padding: 20,
			color: theme.colors.text,
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
			fontSize: 12,
			textAlign: 'center',
			color: theme.colors.text,
		},
	};

	const responsiveStyles = [
		{
			query: { minWidth: 760 },
			style: {
				tabContainer: {
					width: 300,
				},
				contentArea: {
					maxWidth: '100%'
				},
			},
		},
		{
			query: { maxWidth: 760 },
			style: {
				container: {
					flexDirection: 'col',
				},
				tabContainer: {
					width: '100%',
				},
				contentArea: {
					width: '100%',
				},
			},
		},
	];

	const styles = merge(commonStyles, useStylesheet(responsiveStyles));

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
			<Text style={styles.contact}>For any support or issues, please visit our <Text style={{ textDecoration: "underline", textDecorationColor: theme.colors.accent }} onPress={() => Linking.openURL('https://github.com/avikalpg/free-time')}>GitHub repository</Text> and raise an issue or start a discussion.</Text>
		</View>
	);
};

export default HelpSupport;