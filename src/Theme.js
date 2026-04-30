import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme,
} from 'react-native-paper';

const { LightTheme, DarkTheme: NavDark } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const DefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
        surface: '#dfdfdf',
        primary: '#005f3d',
        secondary: '#7de8ab',
        onSurface: '#999',
    },
};

export const DarkTheme = {
    ...MD3DarkTheme,
    ...NavDark,
    colors: {
        ...MD3DarkTheme.colors,
        ...NavDark.colors,
        primary: '#66ff99',
        secondary: '#3a6b5a',
        onSurface: '#aaa',
    },
};
