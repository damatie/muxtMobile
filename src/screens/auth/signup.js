import { StyleSheet, Text, View, Dimensions, } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AuthLayout from '../../layout/AuthLayout';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthIntro } from '../../store/features/generalSlice';
import { BackNav } from '../../components/auth/BackNav';
import { Colors } from '../../utils/Colors';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons'; 

const SignUp = ({navigation }) => {
  const dispatch = useDispatch()
  const [fullName, SetFullName]= useState('')
  const [email, SetEmail]= useState('')
  const [password, SetPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  

  console.log(email)
  console.log(statusMessage)

    // Handle sign up
  const handleSignUp = async () => {
    setIsLoading(true)
    try{ 
      const res =  await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db,'users', res.user.uid),{
        displayName:fullName,
        email:email,
        phoneNumber:'',
        fileUrl: '',
        role:'customer',
        timeStamp: serverTimestamp()
      })
      setError(false)
      setStatusMessage('')
      // clear state
      SetFullName('')
      SetEmail('')
      SetPassword('')
      navigation.navigate('SignIn')

    } catch (err) {
      if (err.code ==='auth/email-already-in-use') {
         setStatusMessage('Email already in use')
      }
      if (err.code === 'auth/invalid-email') {
         setStatusMessage('Invalid email')
      }
      setError(true)
      setIsLoading(false)
    };
  }
// { title: 'Create', subTitle:'Account'  }
  // Load data 
  useEffect(() => {
    setIsLoading(false)
    dispatch(setAuthIntro({ title: 'Create', subTitle:'Account'  }))
  },[])

  return (
    <>
      <BackNav onPress={() => navigation.navigate('Welcome') }/>
      <AuthLayout>
        <>
          <View style={{
            borderBottomLeftRadius: 100 / 2,
            borderBottomRightRadius: 100 / 2
          }}>
            <View style={{backgroundColor: Colors.white,   flexDirection: 'column', paddingHorizontal:25, paddingVertical:'6%',  borderTopRightRadius:100/2, borderBottomLeftRadius:100/2, borderBottomRightRadius:100/2 }}>
              <Text style={{ fontSize: 24, fontFamily: 'Poppins_600SemiBold', color: Colors.black, marginBottom: 10 }}>Signup  </Text>
              <TextInput
              mode='flat'
              value={fullName}
              label="Full name"
              activeUnderlineColor={Colors.primaryLight}
              onChangeText={text => SetFullName(text)}
                style={{ marginBottom: 15, height: 45, backgroundColor: Colors.white, fontSize: 13, fontFamily: 'Poppins_400Regular', }}
                left={
                <TextInput.Icon name="account"  color={Colors.whiteGray}
                />
              }
            />
            
            <TextInput
              mode='flat'
              value={email}
              label="Email"
              activeUnderlineColor={Colors.primaryLight}
              onChangeText={text => SetEmail(text)}
                style={{ marginBottom: 15, height: 45, backgroundColor: '#fff', fontSize: 13, fontFamily: 'Poppins_400Regular', }}
                left={
                <TextInput.Icon name="email"  color={Colors.whiteGray}
                />
              }
            />
            <TextInput
              mode='flat'
              label='Password'
              value={password}
              activeUnderlineColor={Colors.primaryLight}
              secureTextEntry={showPassword}
              left={
                <TextInput.Icon name="lock"  color={Colors.whiteGray}
                   />
              }
              style={{ marginBottom: 15, height: 50, backgroundColor:Colors.white,fontSize:12,fontFamily:'Poppins_400Regular', }}
              onChangeText={text => SetPassword(text)}
            />
            <Text style={{ textAlign:'right',fontFamily:'Poppins_600SemiBold', fontSize:11 }}>
              Forgot password?
            </Text>
              <Button
              loading={isLoading}
              disabled={isLoading? true: false}
              mode="contained"
              labelStyle={{ color:Colors.white, fontFamily:'Poppins_400Regular',}}
              contentStyle={{ paddingVertical:4,  }}
              onPress={handleSignUp }
              style={{ marginVertical: 10, backgroundColor:Colors.primary,borderRadius:100/2,  }}>
              SignUp
              </Button>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
               <Text style={{
                textAlign: 'center',
                display:error? 'flex': 'none',
                justifyContent:'space-evenly',
                flexDirection:'column',
                backgroundColor: Colors.danger,
                paddingVertical: 7,
                paddingHorizontal: 15,
                borderRadius: 50 / 2,
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                color:Colors.white
            }}>
              {statusMessage}!!
            </Text> 
            
          </View>
          
          
        </>
      </AuthLayout>
    </>
  
  );
  }

export default SignUp
