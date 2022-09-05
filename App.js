import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { useState,useCallback, useEffect, } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { CredentialContext } from './src/store/CredentialContext';

import AuthScreen from './src/screens/auth'; 
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black
} from '@expo-google-fonts/poppins';


export default function App() {
  const [storedCredentials,setStoredCredentials] = useState(null)
  const [appIsReady, setAppIsReady] = useState(false)
   const [isLoggedIn, setIsLoggedIn] = useState(false)

  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });
 useEffect(() => {
    async function prepare() {
      try {
        const value = await AsyncStorage.getItem('user')
        if(value !== null) {
          console.log(value)
          setStoredCredentials(value)
          setIsLoggedIn(true)
        } else {
           setIsLoggedIn(false)
          console.log('No data')
        }
        setAppIsReady(true);
        // await new Promise(resolve => setTimeout(resolve, 10000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
 }, [storedCredentials]);  
  
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null
  }
  
console.log(storedCredentials)
  if (!fontsLoaded) {
    return <Text> Loading</Text>
  } else {
    return (
      <Provider store={store}>
          <SafeAreaView style={styles.container}>
          <CredentialContext.Provider value={{storedCredentials,setStoredCredentials}}>
             <AuthScreen onLayout={onLayoutRootView}/>
          </CredentialContext.Provider>
          </SafeAreaView>
      </Provider>
  
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'red'
  },


});
