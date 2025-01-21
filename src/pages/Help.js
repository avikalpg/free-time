import React from 'react';
import merge from 'deepmerge';
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import { useState } from 'react';
import EnablePromptAPI from './help/EnablePromptAPI';
import { useTheme } from 'react-native-paper';
import { useStylesheet } from 'react-native-responsive-ui';
import { Footer } from '../Footer';
import { StatusBar } from 'expo-status-bar';

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
			padding: 5,
			borderRadius: 5,
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
		<ScrollView contentContainerStyle={{ minHeight: '100%' }}>
			<View>
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
								<Text style={styles.answer}>To get started, think about all the activities that take up your time, such as your job, commute, family responsibilities, rest and recovery, leisure activities, hobbies, and any other regular commitments. For each activity, you'll need to fill in three fields:</Text>
								<Text style={styles.step}>1. Activity: Give a brief name to the activity, e.g. "Full-time job" or "Daily commute"</Text>
								<Text style={styles.step}>2. Time: Enter the number of hours you spend on this activity, e.g. 40 hours per week or 1 hour per day</Text>
								<Text style={styles.step}>3. Frequency: Choose how often you do this activity from the dropdown options, e.g. "per day", "per week", "per month", etc.</Text>
								<Text style={styles.answer}>For example, if you work 40 hours a week, you would fill in "Full-time job" as the activity, "40" as the time, and "per week" as the frequency. Don't forget to include daily chores and other unavoidable activities in your list!</Text>
								<Text style={styles.answer}>Once you've added all your activities, you'll see a pie-chart showing how your weekly time is distributed, as well as the number of hours of free time you have available. You can then use this information to make informed decisions about how to use your time more effectively.</Text>
							</View>
						)}
						{activeTab === 'bestPractices' && (
							<View>
								<Text style={styles.question}>Best practices for getting suggestions for free time.</Text>
								<Text style={styles.answer}>To get the most out of the free time suggestions, make sure to add all your activities, including both essential and non-essential ones. Be as detailed as possible when describing each activity, as this will help the AI generate more relevant suggestions.</Text>
								<Text style={styles.step}>1. Be honest about how you spend your time: Include all your activities, even if they seem insignificant or unimportant.</Text>
								<Text style={styles.step}>2. Be specific: Use clear and concise language when describing each activity.</Text>
								<Text style={styles.step}>3. Think about your goals: Consider what you want to achieve with your free time, and how you can use it to live a more fulfilling life.</Text>
								<Text style={styles.answer}>By following these best practices, you'll get personalized suggestions for saving time in non-essential activities and finding new ways to utilize your free time.</Text>
							</View>
						)}
					</ScrollView>
				</View>
				<Text style={styles.contact}>For any support or issues, please visit our <Text style={{ textDecorationLine: "underline", textDecorationColor: theme.colors.accent }} onPress={() => Linking.openURL('https://github.com/avikalpg/free-time')}>GitHub repository</Text> and raise an issue or start a discussion.</Text>
			</View>
			<Footer />
			<StatusBar style="auto" />
		</ScrollView>
	);
};

export default HelpSupport;