import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import Welcome from "../auth/welcome";
import SignIn from "../auth/signin";
import SignUp from "../auth/signup";
import Main from "../main";
import UserProfile from "../userProfile";
import AccountSettings from "../acoountSettings";
import { CredentialContext } from "../../store/CredentialContext";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    Welcome: {
      path: "welcome",
    },
    SignIn: {
      path: "signIn",
      parse: {
        message: (message) => `${message}`,
      },
    },
    Main: {
      screens: {
        Home: {
          path: "home",
        },
        Search: {
          path: "search",
        },
      },
    },
    UserProfile: {
      screens: {
        PreViewPost: {
          path: "PreViewPost/:id/:name",
          parse: {
            name: (name) => `${name}`,
            id: (id) => `${id}`,
          },
        },
      },
    },
  },
};

const prefix = Linking.createURL("/");
const AuthScreen = () => {
  return (
    <CredentialContext.Consumer>
      {(value) => (
        <NavigationContainer
          linking={{
            prefixes: [prefix],
            config,
          }}
        >
          <Stack.Navigator>
            {value.storedCredentials ? (
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

                <Stack.Screen
                  name="AccountSettings"
                  component={AccountSettings}
                  options={{
                    header: () => null,
                  }}
                />
              </Stack.Group>
            ) : (
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
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialContext.Consumer>
  );
};
export default AuthScreen;
