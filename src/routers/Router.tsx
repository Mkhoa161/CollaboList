import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../screens/homes/HomeScreen';
import AddNewTask from '../screens/tasks/AddNewTask';
import SearchScreen from '../screens/SearchScreen';
import auth from '@react-native-firebase/auth'
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import TaskDetail from '../screens/tasks/TaskDetail';

const Router = () => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => 
      {
        if(user){
          setIsLogin(true)
        } else{
          setIsLogin(false)
        }
      }
    )
  }, [])

  const Stack = createNativeStackNavigator();

  const MainRouter = (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='AddNewTask' component={AddNewTask}/>
        <Stack.Screen name='SearchScreen' component={SearchScreen}/>
        <Stack.Screen name='TaskDetail' component={TaskDetail}/>
    </Stack.Navigator>
  );

  const AuthRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
    </Stack.Navigator>)

  return isLogin ? MainRouter : AuthRouter;
}

export default Router