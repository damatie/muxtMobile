import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from './profile';
import { PreViewPost } from './preViewPost';

const Stack = createNativeStackNavigator();

const UserProfile = () => {
  return (
      <Stack.Navigator initialRouteName='Profile' >
        <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="PreViewPost"
        component={PreViewPost}
        options={{
          header: () => null,
        }}
        />
      </Stack.Navigator>
  )
}
export default UserProfile