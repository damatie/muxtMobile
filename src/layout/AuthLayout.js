import {
  StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback,
KeyboardAvoidingView, ScrollView,Platform,StatusBar} from 'react-native';
import { useSelector, } from 'react-redux'
import { Colors } from '../utils/Colors';
import { useState } from 'react';


const AuthLayout = ({children }) => {
  const useAppSelector = useSelector;
  const deviceHeight = Dimensions.get('window').height;
  const { authIntro } = useAppSelector((state) => state.general)
  const [statusBg,] = useState(Colors.primary)
  const [statusContent,] = useState('light-content')
  
  return (
    <>
      <StatusBar
          barStyle={statusContent}
          backgroundColor={statusBg}
        />
      <KeyboardAvoidingView enabled={true} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Colors.primary, flex: 1, }} >
        <View style={{ backgroundColor:Colors.white, paddingLeft:0}}>
          <View style={{ paddingHorizontal:20, paddingTop:deviceHeight/30, paddingBottom:deviceHeight/15,  borderBottomLeftRadius:100/2, backgroundColor: Colors.primary,flexDirection:'column', alignItems:'flex-start'}}>
            <Text style={{ fontSize: 30, fontFamily: 'Poppins_700Bold', color:Colors.white, marginBottom: Platform.OS==='ios'? -9: -18 }}>{authIntro.title}</Text>
            <Text style={{ fontSize: 30, fontFamily: 'Poppins_700Bold', color: Colors.white, marginBottom:Platform.OS==='ios'? -2: -10}}>{authIntro.subTitle}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', color: Colors.white }}>Hey we are happy to see you here.</Text>
        </View>
       </View>
        {children}
      </ScrollView>
      </KeyboardAvoidingView>
      
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.primary
  },


});
export default AuthLayout