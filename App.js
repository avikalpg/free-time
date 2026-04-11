import React from 'react';
import { PreferencesContext } from './src/PreferencesContext';
import { Helmet } from 'react-helmet';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import ReactGA from 'react-ga4';

import { Header } from './src/Header';
import Home from './src/Home';
import PrivacyPolicy from './src/PrivacyPolicy';
import { DefaultTheme, DarkTheme } from './src/Theme';
import Help from './src/pages/Help';
import PhilosophyIndex from './src/pages/philosophy/PhilosophyIndex';
import OriginStory from './src/pages/philosophy/OriginStory';
import FocusTime from './src/pages/philosophy/FocusTime';
import Buffers from './src/pages/philosophy/Buffers';
import Recovery from './src/pages/philosophy/Recovery';
import LifeGoals from './src/pages/philosophy/LifeGoals';

const Stack = createNativeStackNavigator();

export default function App() {
	ReactGA.initialize("G-S9YE72LCW4");
	const [isThemeDark, setIsThemeDark] = React.useState(false);
	let theme = isThemeDark ? DarkTheme : DefaultTheme;
	const toggleTheme = React.useCallback(() => {
		return setIsThemeDark(!isThemeDark);
	}, [isThemeDark]);

	const preferences = React.useMemo(() => ({
		toggleTheme,
		isThemeDark,
	}), [toggleTheme, isThemeDark])
	return (
		// Context is wired into the local state of our main component, so that its values could be propagated throughout the entire application
		<PreferencesContext.Provider value={preferences}>
			<PaperProvider theme={theme}>
				<NavigationContainer theme={theme}>
					<Helmet>
						<script
							async
							src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9543408536781579"
							crossorigin="anonymous"></script>
					</Helmet>
					<Stack.Navigator initialRouteName='Home' screenOptions={{
						header: (props) => <Header {...props} />,
					}}>
						<Stack.Screen name='Home' component={Home} options={{ title: "Free time in a Week" }} />
						<Stack.Screen name='Help' component={Help} options={{ title: "Help & Support" }} />
						<Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{ title: "Privacy Policy" }} />
						<Stack.Screen name='Philosophy' component={PhilosophyIndex} options={{ title: "Philosophy of Free Time" }} />
						<Stack.Screen name='PhilosophyOrigin' component={OriginStory} options={{ title: "You Have More Time Than You Think" }} />
						<Stack.Screen name='PhilosophyFocus' component={FocusTime} options={{ title: "Free Hours Aren't Enough — You Need Free Blocks" }} />
						<Stack.Screen name='PhilosophyBuffers' component={Buffers} options={{ title: "Never Schedule to Zero" }} />
						<Stack.Screen name='PhilosophyRecovery' component={Recovery} options={{ title: "Rest Is Not the Absence of Work" }} />
						<Stack.Screen name='PhilosophyLifeGoals' component={LifeGoals} options={{ title: "Busy Every Day, Going Nowhere" }} />
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</PreferencesContext.Provider>
	);
}
