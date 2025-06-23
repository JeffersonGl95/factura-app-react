import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <AppNavigator />
    </SafeAreaView>
  );
}