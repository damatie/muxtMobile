import { StyleSheet, Text, View, Dimensions,SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import AuthLayout from '../../layout/AuthLayout';
import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthIntro } from '../../store/features/generalSlice';
import { BackNav } from '../../components/auth/BackNav';
import { Colors } from '../../utils/Colors';
import { auth,db} from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../../store/CredentialContext';
import { Input } from '../../components/shared/Input';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { doc, updateDoc } from 'firebase/firestore';
import * as Linking from 'expo-linking';


const SignIn = ({ navigation, }) => {
  const dispatch = useDispatch()
  const{storedCredentials,setStoredCredentials} = useContext(CredentialContext)
  const deviceWidth = Dimensions.get('window').height;
  const [showPassword, setShowPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
    const userInfo = {
    email:'',
    password:'' 
  }

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().trim().email('*Invalid email').required('*Email is required'),
    password: Yup.string().trim().required('*Password is required')
  })
  
  

    // Handle Sign In
  const handleLogin = async (values) => {
    const { email, password } = values
    console.log('submited')
    setIsLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      let value = res.user.uid
      // Update user online status
      if (value) {
        const userRef = doc(db, "users", value);
          await updateDoc(userRef, {
              isOnline: true,
          })
        persistLogin(value)
        setStatusMessage()
      }
      

    } catch (err){
      // console.log(err?.message)
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-email'
      ) {
         setStatusMessage('Incorrect password/email ')
      }
      if (err.code === 'auth/network-request-failed') {
         setStatusMessage('Check network connection')
      }
    }
    setIsLoading(false)
    
  }

  // PersistLogin
  const persistLogin = async (value) => {
    try {
      const res = await AsyncStorage.setItem('user', value)
      setStoredCredentials(res)

    } catch (err){
      console.log(err)
      // console.log(' filed setting')
    }
  }

  useEffect(() => {
    setIsLoading(false)
    dispatch(setAuthIntro({ title: 'Welcome', subTitle: 'Back' }))
  },[])


  
  return (
    <>
      <BackNav onPress={() => navigation.navigate('Welcome') }/>
      <AuthLayout style={styles.container}>
        <>
          <View style={{
            borderBottomLeftRadius: 100 / 2,
            borderBottomRightRadius: 100 / 2
          }}>
            <View style={{ backgroundColor:Colors.white,   flexDirection: 'column', paddingHorizontal:25, paddingVertical:'6%',  borderTopRightRadius:100/2, borderBottomLeftRadius:100/2, borderBottomRightRadius:100/2 }}>
            <Text style={{ fontSize:24,fontFamily:'Poppins_600SemiBold', color:Colors.black, marginBottom:10}}>Login  </Text> 
          
              <Formik initialValues={userInfo}
                validationSchema={validationSchema}
                onSubmit={(values,) => {
                 
                  if (values) {
                     handleLogin(values)
                  }
                }}
              >
                {({ values, errors, touched, handleChange,
                  handleBlur, handleSubmit }) => {
                  const { email, password } = values
                  return <>
                    <Input
                      mode='flat'
                      err={touched.email &&  errors.email}
                      value={email}
                      label="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      left={
                      <TextInput.Icon name="account"  color={Colors.whiteGray}
                      />
                      }
                        />
                    <Input
                      mode='flat'
                      err={touched.password &&  errors.password}
                      label='Password'
                      value={password}
                      secureTextEntry={showPassword}
                      left={
                        <TextInput.Icon name="lock"  color={Colors.whiteGray}
                          onPress={() => setShowPassword(!showPassword)} />
                      }
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    <Text style={{ textAlign:'right',fontFamily:'Poppins_600SemiBold', fontSize:11 }}>
                      Forgot password?
                    </Text>
                    <Button
                    loading={isLoading}
                    disabled={isLoading? true: false}
                    mode="contained"
                    labelStyle={{ color:'#fff', fontFamily:'Poppins_400Regular',}}
                    contentStyle={{ paddingVertical: 4, }}
                    onPressIn={handleSubmit}
                    onPress ={handleSubmit}
                    style={{ marginVertical: 10, backgroundColor:Colors.primary,borderRadius:100/2,  }}>
                    {!isLoading? 'Login': null}
                    </Button>
                </>
                }}
              </Formik>
           
            </View>
          </View>
          <View style={{ flex:1, marginTop: 20, marginBottom:20, width:deviceWidth>320? '100%':deviceWidth/2, }}>
            <Text style={{ marginBottom:20,color:Colors.white, textAlign:'center',fontFamily:'Poppins_600SemiBold', fontSize:11}}>
              OR Login with socials
            </Text>
            <View style={{ flexDirection: 'row',  justifyContent:'center'}}>
              <View style={{ padding:8, backgroundColor:'#EA4333',  borderRadius:100/2, flexDirection:'row', marginHorizontal:10, width:120, justifyContent:'center'}}>
                <AntDesign name="googleplus" size={18} color={Colors.white} style={{ marginRight: 8, }} />
                <Text style={{ color:'#fff', fontSize:11,fontFamily:'Poppins_400Regular',}}>
                  Google
                </Text>
              </View>
              <View style={{ padding:8,  backgroundColor:'#64B5EB',  borderRadius:100/2, flexDirection:'row',marginHorizontal:10,width:120, justifyContent:'center'}}>
                <FontAwesome name="facebook" size={18} color={Colors.white} style={{ marginRight: 8, }} />
                <Text style={{ color:'#fff', fontSize:11,fontFamily:'Poppins_400Regular',}}>
                  Facebook
                </Text>
              </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <Text style={{
                textAlign: 'center',
                display:statusMessage? 'flex': 'none',
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
                {statusMessage}
              </Text> 
            </View>
          </View>
        </>
      </AuthLayout>
    </> 

    
  
  );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#4A154B'
  },
});

export default SignIn
