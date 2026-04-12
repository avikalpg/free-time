import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { openURL } from './utils/UrlUtility';

export function Footer(props) {
    const navigation = useNavigation();
    const theme = useTheme();

    const styles = StyleSheet.create({
        footer: {
            backgroundColor: theme.colors.accent,
            borderTopWidth: 1,
            borderColor: theme.colors.disabled,
            paddingVertical: 8,
            paddingHorizontal: 8,
            marginTop: '5em',
        },
        linksRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        copyrightRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 4,
            paddingBottom: 4,
        },
        copyright: {
            fontSize: 12,
            color: theme.colors.placeholder,
            alignSelf: 'center',
        },
    });

    return (
        <View style={styles.footer}>
            <View style={styles.linksRow}>
                <Button
                    mode="text"
                    icon="github"
                    onPress={openURL("https://github.com/avikalpg/free-time")}
                    color={theme.colors.text}
                    uppercase={false}
                    compact>
                    Contribute
                </Button>
                <Button
                    mode='text'
                    onPress={() => navigation.navigate('Philosophy')}
                    color={theme.colors.text}
                    uppercase={false}
                    compact>
                    Philosophy
                </Button>
                <Button
                    mode='text'
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    color={theme.colors.text}
                    uppercase={false}
                    compact>
                    Privacy Policy
                </Button>
            </View>
            <View style={styles.copyrightRow}>
                <Text style={styles.copyright}>
                    {'© '}
                    <Text
                        style={[styles.copyright, { textDecorationLine: 'underline' }]}
                        onPress={openURL("https://github.com/avikalpg")}
                    >
                        Avikalp Gupta
                    </Text>
                    {' '}{new Date().getFullYear()}
                </Text>
            </View>
        </View>
    );
}
