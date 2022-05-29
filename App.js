import React from 'react';
import { Helmet } from 'react-helmet';
import Home from './src/Home';
import PrivacyPolicy from './src/PrivacyPolicy';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (<NavigationContainer>
    <Helmet>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9543408536781579"
        crossorigin="anonymous"></script>
    </Helmet>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home} options={{ title: "Free time in a Week" }} />
      <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{ title: "Privacy Policy" }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
