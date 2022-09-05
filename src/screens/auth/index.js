import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import Welcome from '../auth/welcome'
import SignIn from '../auth/signin'
import SignUp from '../auth/signup'
import Main from '../main';
import { CredentialContext } from '../../store/CredentialContext';

const Stack = createNativeStackNavigator();

const AuthScreen = ({isLoggedIn}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check loggedIn User

    // const checkLoginUser = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('user')
    //     if(value !== null) {
    //       console.log(value)
    //       setIsLoggedIn(true)
    //     } else {
    //        setIsLoggedIn(false)
    //       console.log('No data')
    //     }
    //   } catch(e) {

    //     console.log(e)
    //   }
    // }
  useEffect(() => {
    // checkLoginUser()
  },[])

  return (
    <CredentialContext.Consumer>
      {(value) => (
          <NavigationContainer>
          <Stack.Navigator >
            {value.storedCredentials?  <Stack.Screen
              name="Main"
              component={Main}
              options={{
              header: () => null,
              }}
            />:     
            <>
              <Stack.Screen
                  name="Welcome"
                  component={Welcome}
                  options={{
                  header: () => null,
                  }}
                  
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{
                  header: () => null,
                  }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{
                  header: () => null,
                  }}
                  />
            </>} 
            </Stack.Navigator>
          </NavigationContainer>
      )
      }
    </CredentialContext.Consumer>
   
  )
}
export default AuthScreen