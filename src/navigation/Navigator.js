import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen'
import DetailsScreen from '../pages/DetailsScreen'


Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitle: 'Home',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: false,
          headerTitle: 'Details',
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator;

