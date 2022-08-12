import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar, SafeAreaView,Platform  } from 'react-native';
import { Home } from './home';
import { Search } from './search/';
import { LocationFeed } from './locationFeed/';
import { Wallet } from './wallet/';
import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export const  Main =() => {
   
    return (
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar  barStyle={'dark-content' } backgroundColor ={'#fff'} />
          <View style={{ backgroundColor:'#fff', flex:1}}>
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
          </View>
        </SafeAreaView>
      </>
  
  );
}
  
  // Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default Main
