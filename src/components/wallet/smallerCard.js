import { View, Text,StyleSheet } from "react-native"
import { Colors } from "../../utils/Colors"
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const SmallerCard = ({icon, text,color, handleView}) => {
  return (
     <View style={{ height: 50, alignContent: 'center', alignItems: 'center', marginHorizontal:10  }}>
    <FontAwesome name={icon} size={18} color={color}
      style={{ width:40, textAlign:'center', paddingVertical:10, backgroundColor:Colors.white, elevation:2, borderRadius:10,  }}
      
      />
      {/* <MaterialCommunityIcons name={icon} size={20} color={color}
      style={{ paddingHorizontal:10, paddingVertical:10, backgroundColor:Colors.white, elevation:2, borderRadius:10,  }} /> */}
    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize:10, marginTop:3}}>
        {text}
    </Text>
  </View>
  )
}

 // Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 120, width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    elevation: 2,
    shadowColor: Colors.black,
    shadowRadius: 30
  },
  titleHeader: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold'
  },
  textMd: {
    marginTop: 10,
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold'
  },
  textSm: {
    color: Colors.whiteGray,
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold'
  },
});