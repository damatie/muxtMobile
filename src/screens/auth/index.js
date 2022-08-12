import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../auth/welcome'
import SignIn from '../auth/signin'
import SignUp from '../auth/signup'
import Main from '../main';
import { Home } from '../home';

const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
          header: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default AuthScreen