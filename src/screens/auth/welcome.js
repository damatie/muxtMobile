import { StyleSheet, Text, View, StatusBar, SafeAreaView,Platform,Image,ImageBackground,TouchableHighlight  } from 'react-native';
import { Button } from 'react-native-paper';

const Welcome = ({ navigation }) => {
  return (
    <>
      {/* source={require('../../../assets/bg-3.jpg')} */}
      <ImageBackground  resizeMode="cover" style={{ flex:1, backgroundColor:'#fff',}} blurRadius={1} >
        <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
        <View style={{ flex:1,}}>
          <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', paddingTop: '80%' }}>
          
            <View style={{ width: 500, height: 100, borderRadius: 250 / 2, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
              
              <Image
                source={require('../../../assets/logo-2.png')}
                style={{
                  width:'38%',
                  height: '100%',
                  resizeMode: "contain",

                }}
              />
              <Text style={{ fontFamily:'Poppins_400Regular', fontSize:12, color:'#000'}}>A  digital Ads space making you visible</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', paddingHorizontal: 30, marginBottom: 20, }}>
            <Button
              onPress={() => navigation.navigate('SignIn') }
              mode="contained"
              labelStyle={{ color:'#4A154B', fontFamily:'Poppins_400Regular', fontSize:10}}
              contentStyle={{ paddingVertical:5,  }}
              style={{ marginVertical: 10, backgroundColor:'#fff', borderWidth:1, borderColor:'#4A154B', borderRadius:100/2,  }}>
             Login to your account
            </Button>
            
            <Button
              onPress={() => navigation.navigate('SignUp') }
              mode="contained"
              labelStyle={{ color:'#fff', fontFamily:'Poppins_400Regular', fontSize:10}}
              contentStyle={{ paddingVertical:5,  }}
              style={{ marginVertical: 10, backgroundColor:'#4A154B', borderWidth:1, borderColor:'#4A154B', borderRadius:100/2,  }}>
              Create account
              </Button>
          </View>
        </View>
        
      </ImageBackground>
    </>
  )
}
export default Welcome