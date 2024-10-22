import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import HomeScreen from './src/screens/homes/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routers/Router';
import { colors } from './src/constants/colors';
import SpaceComponent from './src/components/SpaceComponent';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.bgColor}}>
      <StatusBar
        translucent={true}   // Makes the status bar transparent
        backgroundColor={colors.bgColor}  // Ensures transparency
        barStyle="light-content"  // Changes text/icons to dark color (you can use 'light-content' if needed)
      />
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  )
}

export default App