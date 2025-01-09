import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingListScreen from './src/screens/ShoppingListScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="ShoppingList" 
          component={ShoppingListScreen}
          options={{ title: 'My Shopping List' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}