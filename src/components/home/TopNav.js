import { Platform, View, Text, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialContext } from "../../store/CredentialContext";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export const TopNav = () => {
  const { setStoredCredentials, storedCredentials } =
    useContext(CredentialContext);

  const navigation = useNavigation();

  // Handle Logout
  const handleLogout = () => {
    // console.log('logout')
    if (storedCredentials) {
      const userRef = doc(db, "users", storedCredentials);
      updateDoc(userRef, {
        isOnline: false,
      });
      persistLogin();
    }
  };

  // Persist Login
  const persistLogin = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setStoredCredentials(null);
    } catch (err) {
      console.log(err);
      // console.log(' filed logout')
    }
  };
  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", paddingBottom: 5 }}>
          <TouchableOpacity
            onPress={handleLogout}
            // onPress={() =>
            //   navigation.navigate("AccountSettings", {
            //     screen: "Account",
            //     params: {
            //       path: `Account`,
            //     },
            //   })
            // }
            style={{
              height: 30,
              width: 30,
              borderRadius: 35 / 2,
              backgroundColor: "#eef",
              alignItems: "flex-start",
            }}
          >
            <Image
              source={require("../../../assets/ads-5.jpg")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: Platform.OS === "ios" ? 50 : 50,
                resizeMode: Platform.OS === "ios" ? "cover" : "contain",
              }}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 1, alignItems: "flex-start", alignItems: "center" }}
          >
            <Image
              source={require("../../../assets/logo-2.png")}
              style={{
                width: 100,
                height: 30,
                resizeMode: "contain",
              }}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#4A154B",
                width: 30,
                height: 30,
                paddingTop: 3,
                textAlign: "center",
                paddingLeft: 3,
                borderRadius: 30,
              }}
            >
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
              <View
                style={{
                  backgroundColor: "red",
                  color: "white",
                  height: 8,
                  width: 8,
                  fontSize: 10,
                  textAlign: "center",
                  borderRadius: 15,
                  position: "absolute",
                  right: 5,
                  top: 3,
                }}
              ></View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, flexDirection: "column", marginTop: 10 }}>
            {/* <Text
              style={{
                color: "#000",
                fontFamily: "Poppins_600SemiBold",
                fontSize: 13,
              }}
            >
              Hi, Maxwell
            </Text> */}
            <Text
              style={{
                color: "#000",
                fontSize: 14,
                fontFamily: "Poppins_700Bold",
                marginTop: 0,
              }}
            >
              Explore Deals and Offers!
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
