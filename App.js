import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Episodes } from './src/components/Episodes';
import { Home } from './src/components/Home';
import { Seasons } from './src/components/Seasons';
import { Shows } from './src/components/Shows';


const stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="Home"
            component={Home}
          />
          <stack.Screen
            name="Shows"
            component={Shows}
          />
          <stack.Screen
            name="Seasons"
            component={Seasons}
          />
          <stack.Screen
            name="Episodes"
            component={Episodes}
          />
        </stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
