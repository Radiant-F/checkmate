import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, SignIn, SignUp, SplashScreen} from '../screens';
import {RootStackParamList} from './config';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarColor: 'transparent',
          statusBarTranslucent: true,
          contentStyle: {backgroundColor: 'black'},
        }}>
        <Stack.Screen component={SplashScreen} name="SplashScreen" />
        <Stack.Screen component={SignIn} name="SignIn" />
        <Stack.Screen component={SignUp} name="SignUp" />
        <Stack.Screen component={Home} name="Home" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
