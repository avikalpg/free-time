import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import LinkToURL from './components/Link';

export function Footer(props) {
    const navigation = useNavigation();
    const theme = useTheme();

    const styles = StyleSheet.create(({
        footer: {
            flexDirection: 'row',
            backgroundColor: theme.colors.surface,
            borderTopWidth: '1px',
            borderColor: theme.colors.disabled,
            color: theme.colors,
            marginTop: '5em',
        },
        copyright: {
            height: 'auto',
            alignSelf: 'center',
            flexGrow: 1,
            marginHorizontal: '1em'
        },
    }))

    const Copyright = () => {
        return (
            <Text style={styles.copyright}>
                {'© '}
                <LinkToURL url="https://github.com/avikalpg" >
                    Avikalp Gupta
                </LinkToURL >{' '}
                {new Date().getFullYear()}
            </Text>
        );
    }

    return (
        <View style={styles.footer}>
            <Copyright />
            <LinkToURL url="https://github.com/avikalpg/free-time" >
                <Button
                    mode="text"
                    icon="github"
                    color={theme.colors.text}
                    uppercase={false}
                    compact>
                    Contribute
                </Button>
            </LinkToURL>
            <Button
                mode='text'
                onPress={() => navigation.navigate('PrivacyPolicy')}
                color={theme.colors.text}
                uppercase={false}
            >
                Privacy Policy
            </Button>
        </View>
    )
}