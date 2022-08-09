import { StyleSheet, Text, View, Dimensions, } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import AuthLayout from '../../layout/AuthLayout';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthIntro } from '../../store/features/generalSlice';
import { BackNav } from '../../components/auth/BackNav';

const SignUp = ({navigation,route }) => {
  const dispatch = useDispatch()
  const [fullName, SetFullName]= useState()
  const [email, SetEmail]= useState()
  const [password, SetPassword] = useState()
  const [showPassword, setShowPassword] = useState(true)
  const [error, setError] = useState()
  const[statusMessage,setStatusMessage ] = useState('')
  

  console.log(fullName)

    // Handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault()
   
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

  }catch(err) {
    console.log(err)
    setError(true)
 
    setStatusMessage('Invalid Details')
  
  };
  
  }
  useEffect(() => {
    dispatch(setAuthIntro(route.params))
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
            <View style={{backgroundColor: '#fff',   flexDirection: 'column', paddingHorizontal:25, paddingVertical:'6%',  borderTopRightRadius:100/2, borderBottomLeftRadius:100/2, borderBottomRightRadius:100/2 }}>
              <Text style={{ fontSize: 24, fontFamily: 'Poppins_600SemiBold', color: '#000', marginBottom: 10 }}>Signup  </Text>
              <TextInput
              mode='flat'
              value={email}
              label="Full name"
              outlineColor='#E5E5EA'
              activeUnderlineColor='#902694'
              onChangeText={text => SetFullName(text)}
                style={{ marginBottom: 15, height: 45, backgroundColor: '#fff', fontSize: 13, fontFamily: 'Poppins_400Regular', }}
                left={
                <TextInput.Icon name="account"  color={'#E6E6E6'}
                />
              }
            />
            
            <TextInput
              mode='flat'
              value={email}
              label="Email"
              outlineColor='#E5E5EA'
              activeUnderlineColor='#902694'
              onChangeText={text => SetEmail(text)}
                style={{ marginBottom: 15, height: 45, backgroundColor: '#fff', fontSize: 13, fontFamily: 'Poppins_400Regular', }}
                left={
                <TextInput.Icon name="email"  color={'#E6E6E6'}
                />
              }
            />
            <TextInput
              mode='flat'
              label='Password'
              value={password}
              outlineColor='#E5E5EA'
              activeUnderlineColor='#902694'
              secureTextEntry={showPassword}
              left={
                <TextInput.Icon name="lock"  color={'#E4E5E9'}
                   />
              }
              style={{ marginBottom: 15, height: 50, backgroundColor:'#fff',fontSize:12,fontFamily:'Poppins_400Regular', }}
              onChangeText={text => SetPassword(text)}
            />
            <Text style={{ textAlign:'right',fontFamily:'Poppins_600SemiBold', fontSize:11 }}>
              Forgot password?
            </Text>
            <Button
              mode="contained"
              labelStyle={{ color:'#fff', fontFamily:'Poppins_400Regular',}}
              contentStyle={{ paddingVertical:4,  }}
              onPress={handleSignUp}
              style={{ marginVertical: 10, backgroundColor:'#4A154B',borderRadius:100/2,  }}>
              Login
              </Button>
            </View>
          </View>
          
        </>
      </AuthLayout>
    </>
  
  );
  }

export default SignUp
