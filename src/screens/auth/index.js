import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import Welcome from '../auth/welcome'
import SignIn from '../auth/signin'
import SignUp from '../auth/signup'
import Main from '../main';
import UserProfile from '../userProfile';
import { CredentialContext } from '../../store/CredentialContext';

const Stack = createNativeStackNavigator();

const AuthScreen = () => {

  return (
    <CredentialContext.Consumer>
      {(value) => (
          <NavigationContainer>
          <Stack.Navigator >
            {value.storedCredentials ?
              <Stack.Group>
                <Stack.Screen
                  name="Main"
                  component={Main}
                  options={{
                  header: () => null,
                  }}
                />
                <Stack.Screen
                  name="UserProfile"
                  component={UserProfile}
                  options={{
                  header: () => null,
                  }}
                />
              </Stack.Group>
             :     
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