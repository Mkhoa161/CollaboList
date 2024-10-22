import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import HomeScreen from './src/homes/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routers/Router';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App