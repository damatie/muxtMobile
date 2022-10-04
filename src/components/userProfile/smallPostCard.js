import { View, Text, Dimensions,Image,TouchableOpacity, } from "react-native"
import { Colors } from "../../utils/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';
 
export const SmallPostCard = ({adImg,views,previewPost}) => {
   const deviceWidth = Dimensions.get('window').width;
  return (
    <View style={{ height: deviceWidth / 3 - 1, margin: 0.5, width: deviceWidth / 3 - 1, backgroundColor: Colors.offWhite, position: 'relative' }}>
        <TouchableOpacity
            onPressIn={previewPost}
      >
      <Image
        source={{uri:adImg}}
        style={{
        width:'100%',
        height: '100%',
        resizeMode: "cover",
      }}
      />
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 2,
        opacity:0.7,
        backgroundColor: Colors.black,
        paddingHorizontal: 8,
        marginHorizontal: 5,
        borderRadius: 20,
      }}>
        <Ionicons name="ios-eye-outline" size={12} color="white" style={{marginTop:2}} />
        <Text style={{color:Colors.white, marginLeft:3, marginTop:1, fontSize:10,fontFamily:'Poppins_400Regular' }}>
          {views>999 && views<999999 ? views/100 +'K' :views}
        </Text>
      </View>
    </View>
  )
}