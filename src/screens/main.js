import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, SafeAreaView,Platform  } from 'react-native';
import { Home } from './src/screens/home';
import { Search } from './src/screens/search/Search';
import { LocationFeed } from './src/screens/location-feed/LocationFeed';
import { Wallet } from './src/screens/wallet/Wallet';
import { Settings } from './src/screens/settings/Settings';
import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black
} from '@expo-google-fonts/poppins';

const Tab = createBottomTabNavigator();

export const  Main =() => {
   if (Platform.OS == 'ios') {
  	  StatusBar.setBarStyle('dark-content', true);	//<<--- add this
  }
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
          <StatusBar  barStyle={'dark-content' } backgroundColor ={'#fff'} />
          <View style={{ backgroundColor:'#fff', flex:1}}>
            <NavigationContainer>
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                  tabBarLabelStyle: { fontSize: 10, padding:0, margin:0 },
                  tabBarItemStyle: { width: 100, marginVertical: 0,  },
                  tabBarStyle: {
                    backgroundColor:'#fff', marginHorizontal: 0, marginBottom: 0, borderRadius: 0, paddingHorizontal: 10, paddingBottom:6, height:60  
                  },
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'Home') {
                        iconName ='ios-home-outline'
                      } else if (route.name === 'Search') {
                        iconName ='ios-search' ;
                      }else if (route.name === 'My Feed') {
                        iconName =  'ios-locate';
                      }else if (route.name === 'Wallet') {
                        iconName =  'ios-wallet';
                      }

                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={20} color={color} />;
                    },
                    tabBarActiveTintColor: '#4A154B',
                    tabBarInactiveTintColor: 'black',
                  })}
                >
                  <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                      header: () => null,
                      }}
                  />
                  <Tab.Screen
                    name="Search"
                    component={Search }
                    options={{header: () => null}}
                  />
                  <Tab.Screen
                    name="My Feed"
                    tabBarLabelStyle={{ backgroundColor:'red'}}
                    component={LocationFeed}
                    options={{header: () => null}}
                  />
                  <Tab.Screen
                    name="Wallet"
                    component={Wallet}
                    options={{header: () => null}}
                  />
                  
                </Tab.Navigator>
            </NavigationContainer>
          </View>
        </SafeAreaView>
      </Provider>
  
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    
  },


});
