import { StyleSheet, Text, View, Dimensions, } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import AuthLayout from '../../layout/AuthLayout';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthIntro } from '../../store/features/generalSlice';
import { BackNav } from '../../components/auth/BackNav';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { Colors } from '../../utils/Colors';


const ForgotPassword = ({navigation, }) => {
    const dispatch = useDispatch()
    const deviceWidth = Dimensions.get('window').height;
    const [email, setEmail]= useState('')
    const [loading, setLoading] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(false)
  
    const checkError = ( error ) => {
      switch (error) {
        case 'auth/user-not-found': setStatusMessage('User Does not Exist')
        setError(true)
        setLoading(false)
          break;
        default:
          break;
      }
      
    }
    const handleForgotPassword = () => {
        // console.log({email})
        if (email.trim() !== '' ) {
            setLoading(true)
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setEmail('')
                setStatusMessage('')
                setError(false)
                setLoading(false)
                setSent(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                checkError(errorCode)
            });
        } else {
            setError(true)
            setStatusMessage('Please, put in an email address.')
        }
    }


  

  return (
    <>
      <BackNav onPress={() => navigation.navigate('Welcome') }/>
      {
        sent ? (
            <View
                style={{
                    display:'flex',
                    alignItems:'center',
                    alignContent:'center',
                    paddingVertical: 7,
                    paddingHorizontal: 15,
                    flex:1
                }}
            >
                {/* <FiCheckCircle className=" text-7xl mb-6 text-secondary" /> */}
                <Text style={{ fontSize:22,fontFamily:'Poppins_600SemiBold', color:'#000', marginBottom:5,textAlign:'center'}}>An email has been sent to you, to reset your password.</Text>
                <Button
                    onPress={() => navigation.navigate('SignIn') }
                    mode="contained"
                    labelStyle={{ color:'#4A154B', fontFamily:'Poppins_400Regular', fontSize:10}}
                    contentStyle={{ paddingVertical:5,  }}
                    style={{ marginVertical: 10, backgroundColor:'#fff', borderWidth:1, borderColor:'#4A154B', borderRadius:100/2,  }}
                >
                    Login to your account
                </Button>
            </View>
        ) : (
            <AuthLayout style={styles.container}>
                <>
                    <View style={{
                    borderBottomLeftRadius: 100 / 2,
                    borderBottomRightRadius: 100 / 2
                    }}>
                        <View style={{ backgroundColor: '#fff',   flexDirection: 'column', paddingHorizontal:25, paddingVertical:'6%',  borderTopRightRadius:100/2, borderBottomLeftRadius:100/2, borderBottomRightRadius:100/2 }}>
                            <Text style={{ fontSize:22,fontFamily:'Poppins_600SemiBold', color:'#000', marginBottom:5}}>Forgot Password</Text>
                            <Text style={{ fontSize:14,fontFamily:'Poppins_400Regular', color:'#555', marginBottom:10}}>Enter your email address and we will help you reset your password</Text>
                            <TextInput
                                mode='flat'
                                value={email}
                                label="Email"
                                outlineColor='#E5E5EA'
                                activeUnderlineColor='#902694'
                                onChangeText={text => setEmail(text)}
                                style={{ marginBottom: 15, height: 45, backgroundColor: '#fff', fontSize: 13, fontFamily: 'Poppins_400Regular', }}
                                left={<TextInput.Icon name="email"  color={Colors.whiteGray} />}
                            />
                            <Text style={{
                                textAlign: 'left',
                                display:error? 'flex': 'none',
                                justifyContent:'space-evenly',
                                flexDirection:'column',
                                fontFamily: 'Poppins_400Regular',
                                fontSize: 12,
                                color:'#ff0000'
                                }}
                            >
                                {statusMessage}!!
                            </Text> 
                            <Text
                                onPress={() => navigation.navigate('SignIn') }
                                style={{ textAlign:'right',fontFamily:'Poppins_600SemiBold', fontSize:14, color:'#000000' }}
                            >
                                Login
                            </Text>
                            <Button
                                loading={loading}
                                mode="contained"
                                labelStyle={{ color:'#fff', fontFamily:'Poppins_400Regular',}}
                                contentStyle={{ paddingVertical:4,  }}
                                onPress={handleForgotPassword}
                                onPressIn={handleForgotPassword}
                                style={{ marginVertical: 10, backgroundColor:'#4A154B',borderRadius:100/2,  }}
                                disabled={loading ? true : false}
                                variant={loading? 'disabled': 'primary-solid'}
                            >
                                {loading ? 'Please wait..' : 'Submit'}
                            </Button>
                        </View>
                    </View>
                </>
            </AuthLayout>
        )
      }
    </> 

    
  
  );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#4A154B'
  },


});

export default ForgotPassword
