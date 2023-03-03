import React, { Component, FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Splash from '../screens/Splash/Splash';
import HomeScreen from '../screens/HomeScreen';

const MyStack= createStackNavigator();

const StackNavigator =()=>{
    return (
      <MyStack.Navigator initialRouteName={''} screenOptions={{headerShown:false}}>
          {/* <MyStack.Screen name="TestScreen" component={TestScreen} /> */}
          <MyStack.Screen name="Splash" component={Splash} />
          <MyStack.Screen name="LoginScreen" component={LoginScreen} />
          <MyStack.Screen name="RegisterScreen" component={RegisterScreen} />
          <MyStack.Screen name="HomeScreen" component={HomeScreen} />
      </MyStack.Navigator>
    )
}

export default StackNavigator;