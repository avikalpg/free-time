import React from 'react';
import { useTheme, Appbar, TouchableRipple, Switch } from 'react-native-paper';
import { PreferencesContext } from './PreferencesContext';
import { getHeaderTitle } from '@react-navigation/elements'

export const Header = ({ navigation, route, options, back }) => {
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: theme?.colors.accent,
                },
            }}
        >
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={getHeaderTitle(options, route.name)} />
            <TouchableRipple onPress={() => toggleTheme()}>
                <Switch
                    color={theme.colors.primary}
                    value={isThemeDark}
                />
            </TouchableRipple>
        </Appbar.Header>
    );
};