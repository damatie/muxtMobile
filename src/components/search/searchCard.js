import {
  StyleSheet, Text, View, StatusBar, SafeAreaView, Platform,
TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import { Colors } from '../../utils/Colors';
import { AntDesign } from '@expo/vector-icons'; 
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { Entypo } from '@expo/vector-icons';

export const SearchCard = ({
  viewProfile
}) => {
  return (
    <TouchableOpacity onPress={viewProfile} >
        <View style={{
          width: '100%',
          height: 50,
          marginBottom: 10,
          padding:'1%',
          backgroundColor: Colors.white,
          borderRadius: 50,
          flexDirection:'row',
          elevation: 0,
          shadowColor:'black'
        }}>
            <View style={{
              height: '99%',
              width: 44,
              borderRadius:100,
              backgroundColor: Colors.gray,
            }}>
            </View>
            <View style={{
              height: '99%',
              flex: 1,
              flexDirection:'row',
              borderRadius:10,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              paddingTop:16
              
            }}>
            <Text style={{fontSize:12, fontWeight:'bold', fontFamily:'Poppins_600SemiBold'}}>
              Nike Official
          </Text>
          <Text style={{ color:Colors.gray, fontSize:10, fontWeight:'bold', fontFamily:'Poppins_400Regular'}}>
              Followers 243k
          </Text>
          </View>
        </View>
    </TouchableOpacity>
     
  )
}