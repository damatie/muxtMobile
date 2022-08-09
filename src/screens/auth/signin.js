import { StyleSheet, Text, View, Dimensions, } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import AuthLayout from '../../layout/AuthLayout';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthIntro } from '../../store/features/generalSlice';
import { BackNav } from '../../components/auth/BackNav';

const SignIn = ({navigation,route }) => {
  const dispatch = useDispatch()
  const deviceWidth = Dimensions.get('window').height;
  const [email, SetEmail]= useState()
  const [password, SetPassword] = useState()
  const [showPassword, setShowPassword] = useState(true)
  

  useEffect(() => {
    dispatch(setAuthIntro(route.params))
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
            <View style={{ backgroundColor: '#fff',   flexDirection: 'column', paddingHorizontal:25, paddingVertical:'6%',  borderTopRightRadius:100/2, borderBottomLeftRadius:100/2, borderBottomRightRadius:100/2 }}>
            <Text style={{ fontSize:24,fontFamily:'Poppins_600SemiBold', color:'#000', marginBottom:10}}>Login  </Text>
            <TextInput
              mode='flat'
              value={email}
              label="Email"
              outlineColor='#E5E5EA'
              activeUnderlineColor='#902694'
              onChangeText={text => SetEmail(text)}
                style={{ marginBottom: 15, height: 45, backgroundColor: '#fff', fontSize: 13, fontFamily: 'Poppins_400Regular', }}
                left={
                <TextInput.Icon name="account"  color={'#E6E6E6'}
                  onPress={() => setShowPassword(!showPassword)} />
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
                  onPress={() => setShowPassword(!showPassword)} />
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
              onPress={() => console.log('Pressed')}
              style={{ marginVertical: 10, backgroundColor:'#4A154B',borderRadius:100/2,  }}>
              Login
              </Button>
            </View>
          </View>
          <View style={{ flex:1, marginTop: 20, width:deviceWidth>320? '100%':deviceWidth/2, }}>
            <Text style={{ marginBottom:20,color:'#fff', textAlign:'center',fontFamily:'Poppins_600SemiBold', fontSize:11}}>
              OR Login with socials
            </Text>
            <View style={{ flexDirection: 'row',  justifyContent:'center'}}>
              <View style={{ padding:8, backgroundColor:'#EA4333',  borderRadius:100/2, flexDirection:'row', marginHorizontal:10, width:120, justifyContent:'center'}}>
                {/* <Ionicons name="ios-logo-google" size={24} color="black" style={{ marginRight: 10, }} /> */}
                <AntDesign name="googleplus" size={18} color="white" style={{ marginRight: 8, }} />
                <Text style={{ color:'#fff', fontSize:11,fontFamily:'Poppins_400Regular',}}>
                  Google
                </Text>
              </View>
              <View style={{ padding:8,  backgroundColor:'#64B5EB',  borderRadius:100/2, flexDirection:'row',marginHorizontal:10,width:120, justifyContent:'center'}}>
                <FontAwesome name="facebook" size={18} color="white" style={{ marginRight: 8, }} />
                <Text style={{ color:'#fff', fontSize:11,fontFamily:'Poppins_400Regular',}}>
                  Facebook
                </Text>
              </View>
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
