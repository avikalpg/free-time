import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Free time in a Week</Text>
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffaa',
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
    color: '#552'
  }
});
