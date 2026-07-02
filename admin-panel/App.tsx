import { NavigationContainer } from "@react-navigation/native";
import "./global.css"
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
