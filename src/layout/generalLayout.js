import {
 Text, View, StatusBar, TouchableWithoutFeedback, SafeAreaView
} from 'react-native';
import { Colors } from '../utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
 
const GeneralLayout = (props) => {
  const {barStyle,statusColor,backgroundColor,children,back, title,mainBg}= props
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
       <View style={{flex:1, backgroundColor:mainBg}} >
        <StatusBar barStyle={barStyle} backgroundColor={statusColor} />
        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical:6, backgroundColor: backgroundColor }}>
          <TouchableWithoutFeedback onPress={back}>
            <View  style={{ padding: 3,}}>
              <Ionicons name="arrow-back-outline" size={28} color="black" />
            </View>
          </TouchableWithoutFeedback>
          <Text style={{ paddingTop:8, flex:1, textAlign:'center', fontSize:15, fontWeight:'bold', fontFamily:'Poppins_600SemiBold'}}>
            {title}
          </Text>
        </View>
          {children}
          </View>
    </SafeAreaView>
    </>
  )
}
export default GeneralLayout