import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "./profile";
import { PreViewPost } from "./preViewPost";
import { MyAccount } from "../acoountSettings/myAccount";

const Stack = createNativeStackNavigator();

const UserProfile = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Profile">
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

        <Stack.Screen
          name="MyAccount"
          component={MyAccount}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
export default UserProfile;
