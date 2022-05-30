import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import {
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme,
    Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const DefaultTheme = {
    ...CombinedDefaultTheme,
    colors: {
        ...CombinedDefaultTheme.colors,
        surface: '#dfdfdf',
        primary: 'tomato',
        accent: 'yellow',
    }
};
export const DarkTheme = {
    ...CombinedDarkTheme
};