import {
  StyleSheet, Text, View, StatusBar, SafeAreaView, Platform,
TouchableNativeFeedback} from 'react-native';
import { Colors } from '../../utils/Colors';
import { AntDesign } from '@expo/vector-icons'; 
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { Entypo } from '@expo/vector-icons';

export const SmallCard = ({
  item,
  toggleModal
}) => {
  return (
    <TouchableNativeFeedback onPress={toggleModal}>
        <View style={{
          width: '100%',
          height: 80,
          marginBottom: 10,
          padding:'1%',
          backgroundColor: Colors.white,
          borderRadius: 10,
          flexDirection:'row',
          elevation: 1,
          shadowColor:'black'
        }}>
          <View style={{
            height: '99%',
            width: 80,
            borderRadius:10,
            backgroundColor: Colors.gray,
          }}>
          </View>
          <View style={{
            height: '99%',
            flex: 1,
            flexDirection:'column',
            borderRadius:10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            justifyContent:'space-between'
          }}>
          <Text style={{fontSize:12, fontWeight:'bold', fontFamily:'Poppins_600SemiBold'}}>
            New lunch thid yo de
          </Text>
            <View style={{ flexDirection:'row', marginTop:3, width:200, justifyContent:'space-evenly'}}>
              <AntDesign name={'like1'} size={14} color={Colors.bluePrimary} />
              <Text style={{
                 paddingHorizontal: 5,
                fontSize: 12,
                fontFamily: 'Poppins_400Regular', 
              }}>345K</Text>
              <Ionicons name="md-share-outline" size={14} color="black" />
              <Text style={{
                paddingHorizontal: 5,
                fontSize: 12,
                fontFamily: 'Poppins_400Regular', 
              }}>345K</Text>
               <Ionicons name="ios-eye-outline" size={14} color="black" style={{marginTop:2}} />
              <Text style={{
                 paddingHorizontal: 5,
                fontSize: 12,
                fontFamily: 'Poppins_400Regular', 
              }}>345K</Text>
            </View>
            <Text style={{
              fontSize: 12,
              fontFamily: 'Poppins_400Regular', color:Colors.gray}}>Sponsor: Nike official</Text>
        </View>
        <Entypo name="chevron-thin-right" size={15}  color={Colors.gray} style={{ marginTop:30}} />
        {/* <AntDesign name="right" size={15} color={Colors.gray} style={{ marginTop:30}} /> */}
        </View>
    </TouchableNativeFeedback>
     
  )
}