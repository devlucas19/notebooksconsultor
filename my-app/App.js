import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserPage from './components/UserPage'; // Exemplo de importação do componente
import AdminPage from './components/AdminPage'; // Exemplo de importação do componente
import Login from './components/LoginPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={UserPage} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={AdminPage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


