import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import privacyPolicyFile from '../assets/privacy.md';

export default function PrivacyPolicy(props) {
    const [privacyPolicyText, setPrivacyPolicyText] = useState("placeholder text");

    useEffect(() => {
        fetch(privacyPolicyFile).then(res => res.text()).then(text => {
            setPrivacyPolicyText(text);
        });
    }, []);

    return (
        <View>
            <Markdown>{privacyPolicyText}</Markdown>
        </View>
    )
}