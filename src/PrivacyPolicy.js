import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { StatusBar } from 'expo-status-bar';
import privacyPolicyFile from '../assets/privacy.md';
import { Text } from 'react-native-paper';
import { Footer } from './Footer';

export default function PrivacyPolicy(props) {
    const [privacyPolicyText, setPrivacyPolicyText] = useState("placeholder text");
    const styles = StyleSheet.create({
        privacyPolicyContents: {
            margin: '1em',
        }
    })

    useEffect(() => {
        fetch(privacyPolicyFile).then(res => res.text()).then(text => {
            setPrivacyPolicyText(text);
        });
    }, []);

    return (
        <ScrollView>
            <Text style={styles.privacyPolicyContents}>
                <Markdown>{privacyPolicyText}</Markdown>
            </Text>
            <Footer />
            <StatusBar style='auto' />
        </ScrollView>
    )
}