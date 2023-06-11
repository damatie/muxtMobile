import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AuthLayout from "../../layout/AuthLayout";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";

const ResetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const deviceWidth = Dimensions.get("window").height;
  const [password, setPassword] = useState("");
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
  const handleResetPassword = () => {
    if (password.trim() !== "") {
      setLoading(true);
      confirmPasswordReset(auth, oobCode, password)
        .then(() => {
          setPassword("");
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
      setStatusMessage("Please, put in a password.");
    }
  };

  return (
    <>
      {sent ? (
        <View className=" md:w-[450px] rounded-xl mx-auto justify-center flex items-center flex-col sm:mt-36 lg:mt-auto h-[100vh]  md:h-[100vh]">
          <FiCheckCircle className=" text-7xl mb-6 text-secondary" />
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Poppins_600SemiBold",
              color: "#000",
              marginBottom: 5,
            }}
          >
            Password reset was successful.
          </Text>
          <Button
            onPress={() => navigation.navigate("SignIn")}
            mode="contained"
            labelStyle={{
              color: "#4A154B",
              fontFamily: "Poppins_400Regular",
              fontSize: 10,
            }}
            contentStyle={{ paddingVertical: 5 }}
            style={{
              marginVertical: 10,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#4A154B",
              borderRadius: 100 / 2,
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
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#000",
                    marginBottom: 5,
                  }}
                >
                  Reset Password
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#555",
                    marginBottom: 10,
                  }}
                >
                  Create new password for your Muxt account
                </Text>
                <TextInput
                  mode="flat"
                  value={password}
                  label="Password"
                  outlineColor="#E5E5EA"
                  activeUnderlineColor="#902694"
                  onChangeText={(text) => setPassword(text)}
                  style={{
                    marginBottom: 15,
                    height: 45,
                    backgroundColor: "#fff",
                    fontSize: 13,
                    fontFamily: "Poppins_400Regular",
                  }}
                  left={<TextInput.Icon name="lock" color={Colors.whiteGray} />}
                />
                <Button
                  mode="contained"
                  labelStyle={{
                    color: "#fff",
                    fontFamily: "Poppins_400Regular",
                  }}
                  contentStyle={{ paddingVertical: 4 }}
                  onPress={handleResetPassword}
                  style={{
                    marginVertical: 10,
                    backgroundColor: "#4A154B",
                    borderRadius: 100 / 2,
                  }}
                  disabled={loading ? true : false}
                  variant={loading ? "disabled" : "primary-solid"}
                >
                  {loading ? "Please wait.." : "Submit"}
                </Button>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  display: error ? "flex" : "none",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                  backgroundColor: Colors.danger,
                  paddingVertical: 7,
                  paddingHorizontal: 15,
                  borderRadius: 50 / 2,
                  fontFamily: "Poppins_400Regular",
                  fontSize: 12,
                  color: Colors.white,
                }}
              >
                {statusMessage}!!
              </Text>
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

export default ResetPassword;
