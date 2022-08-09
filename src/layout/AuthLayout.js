import { StyleSheet, Text, View, StatusBar, Dimensions,TouchableWithoutFeedback  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

const AuthLayout = ({ navigation,children }) => {
  const useAppSelector = useSelector;
  const deviceHeight = Dimensions.get('window').height;
  const {authIntro} = useAppSelector((state) => state.general)

  return (
    <>
      <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#4A154B'} />
      <View style={{ backgroundColor: '#4A154B', flex: 1 }} >
        {/* Back navigation */}
       
        
        <View style={{ backgroundColor:'#fff', paddingLeft:0}}>
           <View style={{ paddingHorizontal:20, paddingTop:deviceHeight/30, paddingBottom:deviceHeight/15,  borderBottomLeftRadius:100/2, backgroundColor: '#4A154B',flexDirection:'column', alignItems:'flex-start'}}>
              <Text style={{ fontSize: 30, fontFamily: 'Poppins_700Bold', color: '#fff', marginBottom: -18 }}>{authIntro.title}</Text>
              <Text style={{ fontSize: 30, fontFamily: 'Poppins_700Bold', color: '#fff', marginBottom: -10 }}>{authIntro.subTitle}</Text>
          <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', color: '#fff' }}>Hey we are happy to see you here.</Text>
        </View>
       </View>
        {children}
      </View>
      </View>
      
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#4A154B'
  },


});
export default AuthLayout