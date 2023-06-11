import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AuthLayout from "../../layout/AuthLayout";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthIntro } from "../../store/features/generalSlice";
import { BackNav } from "../../components/auth/BackNav";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Colors } from "../../utils/Colors";
import { Input } from "../../components/shared/Input";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const deviceWidth = Dimensions.get("window").height;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const checkError = (error) => {
    switch (error) {
      case "auth/user-not-found":
        setStatusMessage("User Does not Exist");
        setError(true);
        setLoading(false);
        break;
      default:
        break;
    }
  };
  const handleForgotPassword = () => {
    // console.log({email})
    if (email.trim() !== "") {
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setEmail("");
          setStatusMessage("");
          setError(false);
          setLoading(false);
          setSent(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          checkError(errorCode);
        });
    } else {
      setError(true);
      setStatusMessage("*Please, enter an email address.");
    }
  };

  useEffect(() => {
    dispatch(
      setAuthIntro({
        title: "Forgotten",
        subTitle: "Your password? ",
        tag: "Let's help you reset your password",
      })
    );
  }, []);

  return (
    <>
      <BackNav onPress={() => navigation.navigate("SignIn")} />
      {sent ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            paddingHorizontal: 30,
            paddingTop: "30%",
            flex: 1,
            flexDirection: "column",
            backgroundColor: Colors.primary,
          }}
        >
          {/* <FiCheckCircle className=" text-7xl mb-6 text-secondary" /> */}
          <View style={{ marginBottom: 20 }}>
            <MaterialCommunityIcons
              name="email"
              size={100}
              color={Colors.secondary}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins_600SemiBold",
              color: Colors.white,
              marginBottom: 5,
              textAlign: "center",
              width: 270,
            }}
          >
            Check your email
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins_400Regular",
              color: Colors.white,
              marginBottom: 20,
              textAlign: "center",
              width: 270,
              flex: 1,
            }}
          >
            We have sent a reset password link to your email.
          </Text>
          <Button
            onPress={() => navigation.navigate("SignIn")}
            mode="contained"
            labelStyle={{
              color: "#4A154B",
              fontFamily: "Poppins_400Regular",
              fontSize: 12,
            }}
            contentStyle={{ paddingVertical: 5 }}
            style={{
              marginVertical: 10,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#4A154B",
              borderRadius: 100 / 2,
              height: 55,
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            Login to your account
          </Button>
        </View>
      ) : (
        <AuthLayout style={styles.container}>
          <>
            <View
              style={{
                borderBottomLeftRadius: 100 / 2,
                borderBottomRightRadius: 100 / 2,
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "column",
                  paddingHorizontal: 25,
                  paddingVertical: "6%",
                  borderTopRightRadius: 100 / 2,
                  borderBottomLeftRadius: 100 / 2,
                  borderBottomRightRadius: 100 / 2,
                }}
              >
                {/* <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#000",
                    marginBottom: 5,
                  }}
                >
                  Forgot Password
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins_400Regular",
                    color: "#555",
                    marginBottom: 10,
                  }}
                >
                  Enter your email address and we will help you reset your
                  password
                </Text> */}

                <Input
                  mode="flat"
                  err={statusMessage}
                  value={email}
                  label="Email"
                  onChangeText={(text) => setEmail(text)}
                  left={
                    <TextInput.Icon name="email" color={Colors.whiteGray} />
                  }
                />

                <Button
                  loading={loading}
                  mode="contained"
                  labelStyle={{
                    color: "#fff",
                    fontFamily: "Poppins_400Regular",
                  }}
                  contentStyle={{ height: 55 }}
                  onPress={handleForgotPassword}
                  onPressIn={handleForgotPassword}
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginVertical: 10,
                    backgroundColor: "#4A154B",
                    borderRadius: 100 / 2,
                    width: "100%",
                  }}
                  disabled={loading ? true : false}
                  variant={loading ? "disabled" : "primary-solid"}
                >
                  {loading ? "Please wait.." : "Submit"}
                </Button>
              </View>
            </View>
          </>
        </AuthLayout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A154B",
  },
});

export default ForgotPassword;
