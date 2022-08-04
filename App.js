import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, SafeAreaView,Platform, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './src/screens/auth/signin';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black
} from '@expo-google-fonts/poppins';

const Tab = createBottomTabNavigator();

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });
  if (!fontsLoaded) {
    return <Text> Loading</Text>
  } else {
    return (
      <Provider store={ store}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
          <SignIn/>
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
