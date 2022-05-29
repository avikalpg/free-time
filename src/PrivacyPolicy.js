import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { StatusBar } from 'expo-status-bar';
import privacyPolicyFile from '../assets/privacy.md';
import { Text } from 'react-native-paper';

export default function PrivacyPolicy(props) {
    const [privacyPolicyText, setPrivacyPolicyText] = useState("placeholder text");

    useEffect(() => {
        fetch(privacyPolicyFile).then(res => res.text()).then(text => {
            setPrivacyPolicyText(text);
        });
    }, []);

    return (
        <ScrollView>
            <Text>
                <Markdown>{privacyPolicyText}</Markdown>
            </Text>

            <StatusBar style='auto' />
        </ScrollView>
    )
}