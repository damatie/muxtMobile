import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyAccount } from "./myAccount";

const Stack = createNativeStackNavigator();

const AccountSettings = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Account">
        <Stack.Screen
          name="Account"
          component={MyAccount}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
export default AccountSettings;
