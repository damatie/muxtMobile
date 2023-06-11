import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AuthLayout from "../../layout/AuthLayout";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthIntro } from "../../store/features/generalSlice";
import { BackNav } from "../../components/auth/BackNav";
import { Colors } from "../../utils/Colors";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Input } from "../../components/shared/Input";
import { Formik } from "formik";
import * as Yup from "yup";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [fullName, SetFullName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = {
    fullName: "",
    email: "",
    password: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("*Full name is required"),
    email: Yup.string()
      .trim()
      .email("*Invalid email")
      .required("*Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "password is too short")
      .required("*Password is required"),
  });

  // Handle sign up
  const handleSignUp = async (values) => {
    const { fullName, email, password } = values;
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        displayName: fullName,
        email: email,
        phoneNumber: "",
        fileUrl: "",
        role: "customer",
        timeStamp: serverTimestamp(),
      });
      setStatusMessage("");
      // clear state
      SetFullName("");
      SetEmail("");
      SetPassword("");
      navigation.navigate("SignIn");
    } catch (err) {
      // navigation.navigate('Main')
      if (err.code === "auth/email-already-in-use") {
        setStatusMessage("Email already in use");
      }
      if (err.code === "auth/invalid-email") {
        setStatusMessage("Invalid email");
      }
      if (err.code === "auth/network-request-failed") {
        setStatusMessage("Check network connection");
      }
      setIsLoading(false);
    }
  };
  // { title: 'Create', subTitle:'Account'  }
  // Load data
  useEffect(() => {
    setIsLoading(false);
    dispatch(
      setAuthIntro({
        title: "Create",
        subTitle: "Account",
        tag: "Hey we are happy to see you here.",
      })
    );
  }, []);

  return (
    <>
      <BackNav onPress={() => navigation.navigate("Welcome")} />
      <AuthLayout>
        <>
          <View
            style={{
              borderBottomLeftRadius: 100 / 2,
              borderBottomRightRadius: 100 / 2,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.white,
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
                  color: Colors.black,
                  marginBottom: 10,
                }}
              >
                Signup{" "}
              </Text>
              <Formik
                initialValues={userInfo}
                validationSchema={validationSchema}
                onSubmit={(values, formikActions) => {
                  console.log(values);
                  console.log(formikActions);
                  console.log("before");
                  if (values) {
                    handleSignUp(values);
                  }
                  console.log("after");
                  // formikActions.resetForm()
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => {
                  const { fullName, email, password } = values;
                  return (
                    <>
                      <Input
                        mode="flat"
                        err={touched.fullName && errors.fullName}
                        value={fullName}
                        label="Full name"
                        onChangeText={handleChange("fullName")}
                        onBlur={handleBlur("fullName")}
                        left={
                          <TextInput.Icon
                            name="account"
                            color={Colors.whiteGray}
                          />
                        }
                      />

                      <Input
                        mode="flat"
                        err={touched.email && errors.email}
                        value={email}
                        label="Email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        left={
                          <TextInput.Icon
                            name="email"
                            color={Colors.whiteGray}
                          />
                        }
                      />
                      <Input
                        mode="flat"
                        err={touched.password && errors.password}
                        label="Password"
                        value={password}
                        secureTextEntry={showPassword}
                        left={
                          <TextInput.Icon
                            name="lock"
                            color={Colors.whiteGray}
                          />
                        }
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                      />

                      <Button
                        loading={isLoading}
                        disabled={isLoading ? true : false}
                        mode="contained"
                        labelStyle={{
                          color: Colors.white,
                          fontFamily: "Poppins_400Regular",
                        }}
                        contentStyle={{ height: 55 }}
                        onPressIn={handleSubmit}
                        onPress={handleSubmit}
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          marginVertical: 10,
                          backgroundColor: "#4A154B",
                          borderRadius: 100 / 2,
                        }}
                      >
                        {!isLoading ? "SignUp" : null}
                      </Button>
                    </>
                  );
                }}
              </Formik>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text
              style={{
                textAlign: "center",
                display: statusMessage ? "flex" : "none",
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
              {statusMessage}
            </Text>
          </View>
        </>
      </AuthLayout>
    </>
  );
};

export default SignUp;
