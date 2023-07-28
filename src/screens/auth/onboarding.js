import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthIntro } from "../../store/features/generalSlice";
import { BackNav } from "../../components/auth/BackNav";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Colors } from "../../utils/Colors";
import { Input } from "../../components/shared/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-web";
import { Ionicons } from '@expo/vector-icons';

const Step3 = ({changeStep,onboardingForm,setOnboardingForm}) => {
  const [location, setLocation] = useState('')

  return (
    <View style={styles.stepBox}>
      <Text style={styles.label}>List the top 3 locations that you would like to receive ads from</Text>
      <View style={styles.inputBox}>
        <TextInput
          label="Location"
          mode="outlined"
          value={location}
          onChangeText={location => setLocation(location)}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputRowItem}>Lekki</Text>
        <Text style={styles.inputRowItem}>Ajah</Text>
        <Text style={styles.inputRowItem}>CMS</Text>
      </View>
      <Button
          style={styles.finishBtn}
          onPress={()=>changeStep(4)}
          onPressIn={()=>changeStep(4)}
          labelStyle={{
            color: "#fff",
            fontFamily: "Poppins_400Regular",
            fontSize: 16
          }}
        >
          Finish
        </Button>
    </View>
  )
}

const Step2 = ({changeStep,onboardingForm,setOnboardingForm}) => {
  const [text, setText] = useState('')
  return (
    <View style={styles.stepBox}>
      <Text style={styles.label}>List the top 3 tags that you would like to receive ads from</Text>
      <View style={styles.inputBox}>
        <TextInput
          label="Tags"
          mode="outlined"
          value={text}
          onChangeText={text => setText(text)}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputRowItem}>#freedeals</Text>
        <Text style={styles.inputRowItem}>#flashsales</Text>
        <Text style={styles.inputRowItem}>#valuemunch</Text>
      </View>
      <Button
          style={styles.progressBtn}
          onPress={()=>changeStep(3)}
          onPressIn={()=>changeStep(3)}
          labelStyle={{
            color: "#fff",
            fontFamily: "Poppins_400Regular",
            fontSize: 16
          }}
        >
          Next
        </Button>
    </View>
  )
}

const Step1 = ({changeStep,onboardingForm,setOnboardingForm}) => {
  return (
    <View style={styles.stepBox}>
        <Text style={styles.label}>What is your gender</Text>
        <View>
          <View style={styles.radioBox}>
            <Text style={styles.name}>Male</Text>
            <RadioButton
              value="male"
              color= {Colors.primary}
              status={ onboardingForm.gender === 'male' ? 'checked' : 'unchecked' }
              onPress={() => setOnboardingForm({...onboardingForm,gender:'male'})}
            />
          </View>
          <View style={styles.radioBox}>
            <Text style={styles.name}>Female</Text>
            <RadioButton
              value="female"
              color= {Colors.primary}
              status={ onboardingForm.gender === 'female' ? 'checked' : 'unchecked' }
              onPress={() => setOnboardingForm({...onboardingForm,gender:'female'})}
            />
          </View>
        </View>
        <Button
          style={styles.progressBtn}
          onPress={()=>changeStep(2)}
          onPressIn={()=>changeStep(2)}
          labelStyle={{
            color: "#fff",
            fontFamily: "Poppins_400Regular",
            fontSize: 16
          }}
        >
          Next
        </Button>
    </View>
  )
}

const Step0 = ({changeStep,onboardingForm,setOnboardingForm}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.bigLandingText}>
        Hi, Customer, welcome to Muxt
      </Text>
      <Text style={styles.smallLandingText}>
        Before, you explore the app, we have a few questions that'll enable us personalize your experience
      </Text>
      <View style={styles.flexRowContainer}>
        <View style={styles.box}>
          <View style={styles.mediumBox}>
            <View style={styles.smallBox}>
              <View style={styles.tinyBox}></View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.flexRowContainer}>
        <Button
          onPress={()=>changeStep(1)}
          onPressIn={()=>changeStep(1)}
          style={styles.startBtnIcon}
        >
          <AntDesign name="arrowdown" size={40} color="#eee" />
        </Button>
      </View>
    </View>
  )
}

const Complete = ({navigation}) => {
  return (
    <View style={styles.completeContainer}>
      <Ionicons name="happy-sharp" size={90} color="gold" />
      <Text style={styles.completeLandingText}>
        Thank you for onboarding, you can proceed to exploring the app
      </Text>
      <Button
          onPress={() => navigation.navigate("Main")}
        mode="contained"
        labelStyle={{
          color: "#4A154B",
          fontFamily: "Poppins_400Regular",
          fontSize: 20,
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
        Explore
      </Button>
    </View>
  )
}

const Onboarding = ({ navigation }) => {
  const [step, setStep] = useState(0)
  const [onboardingForm, setOnboardingForm] = useState({
    gender: '',
    tags: [],
    location: []
  })
  const changeStep = (val) => setStep(val)
  const displayOnboardingForm = (val) => {
    switch (val) {
      case 0:
        return  <Step0 changeStep={changeStep} onboardingForm={onboardingForm} setOnboardingForm={setOnboardingForm} />
      case 1:
        return  <Step1 changeStep={changeStep} onboardingForm={onboardingForm} setOnboardingForm={setOnboardingForm} />
      case 2:
        return  <Step2 changeStep={changeStep} onboardingForm={onboardingForm} setOnboardingForm={setOnboardingForm} />
      case 3:
        return  <Step3 changeStep={changeStep} onboardingForm={onboardingForm} setOnboardingForm={setOnboardingForm} />
      case 4:
        return  <Complete navigation={navigation} changeStep={changeStep} onboardingForm={onboardingForm} setOnboardingForm={setOnboardingForm} />
      default:
        return <Step0 changeStep={changeStep} onboardingForm={onboardingForm} setOnboardingForm={setOnboardingForm} />
    }
  }

  return (
    <View style={{
      display: "flex",
      // alignItems: "center",
      // alignContent: "center",
      flex: 1,
      flexDirection: "column",
      // backgroundColor: Colors.primary,
      backgroundColor: '#eeffee',
    }}>
      {displayOnboardingForm(step)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: "15%",
    flex: 1,
    flexDirection: "column",
    // backgroundColor: Colors.primary,
    backgroundColor: '#eeffee',
  },
  completeContainer: {
    paddingHorizontal: 30,
    paddingTop: "15%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.primary,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
    // backgroundColor: '#eeffee',
  },
  completeLandingText: {
    color: '#eee',
    fontWeight: 'semibold',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 20,
    lineHeight: 40,
  },
  bigLandingText: {
    // color: '#dedede',
    // color: '#22222290',
    color: '#222222',
    fontWeight: 'bold',
    fontSize: 40,
  },
  smallLandingText: {
    // color: '#dedede',
    // color: '#22222290',
    color: '#222222',
    marginTop: 20,
    marginBottom: 10,
    lineHeight: 40,
    fontWeight: 'normal',
    fontSize: 24,
  },
  flexRowContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  box: {
    width: 250,
    height: 250,
    position: 'relative',
    // backgroundColor: Colors.offWhite,
    backgroundColor: '#cccccc',
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mediumBox: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    backgroundColor: '#4A154b70',
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallBox: {
    width: '70%',
    height: '70%',
    position: 'absolute',
    backgroundColor: '#4A154b30',
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyBox: {
    width: '70%',
    height: '70%',
    position: 'absolute',
    backgroundColor: Colors.primary,
    borderRadius: 999,
  },
  startBtnIcon: {
    width: 70,
    height: 70,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  stepBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: "column",
    // backgroundColor: "#ee",
    // backgroundColor: Colors.primary,
    backgroundColor: '#eeffee',
  },
  label: {
    color: '#222',
    fontSize: 25,
    fontWeight: 'medium',
    paddingBottom: 20
  },
  radioBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 20,
    padding: 10,
    width: 300,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.black,
    marginVertical: 10,
  },
  name: {
    color: "#222",
    fontSize: 20
  },
  progressBtn: {
    marginTop: 30,
    // backgroundColor: "transparent",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    // paddingVertical: 4,
    marginLeft: 'auto',
    paddingHorizontal: 20
  },
  finishBtn: {
    marginTop: 30,
    // backgroundColor: "transparent",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: "100%",
    marginLeft: 'auto',
    paddingHorizontal: 20
  },
  inputBox: {
    width: 300
  },
  inputRow: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 300,
    marginTop: 20,
    // backgroundColor: "#827",
    flexDirection: "row"
  },
  inputRowItem: {
    margin: 2,
    // fontSize: 17,
    backgroundColor: "#ededed",
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold"
  }
});

export default Onboarding;
