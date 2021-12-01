import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pomodoro from './Pomodoro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="clock" component={Pomodoro}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}





