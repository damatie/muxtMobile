import { View, Text, Image } from "react-native"
import { Button } from 'react-native-paper';
import { Colors } from "../../utils/Colors"

export const ProfileCard = ({name, userImg,handleFollow,followers,likes,views,label}) => {
    return (
      <View style={{
        flexDirection: 'column',
        minHeight: 310,
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingBottom: 20,
        marginBottom:3
      }}>
        <View style={{
          height: 100,
          marginTop: 25,
          marginBottom:15,
          width: 100,
          borderRadius: 100 / 2,
          backgroundColor: Colors.whiteGray,
          overflow:'hidden'
        }}>
          <Image
            source={{uri:userImg}}
            style={{
            width: '100%',
            height:'100%',
            flex: 1,
            resizeMode: 'contain',
            borderRadius:100
          }}
          />
        </View>
        <Text style={{ fontSize:14, fontFamily:'Poppins_600SemiBold'}}>
          {name}
        </Text>
        <View style={{ marginVertical:10, width:250, justifyContent:'space-around', flexDirection:'row', flex:1,}}>
          <View style={{ flexDirection:'column',alignItems:'center', }}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>{followers }</Text>
            <Text style={{ color: Colors.gray, fontSize:12,fontFamily:'Poppins_400Regular'}}>Followers</Text>
          </View>
          <View style={{ flexDirection:'column',alignItems:'center'}}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>{likes}</Text>
            <Text style={{color: Colors.gray, fontSize:12, fontFamily:'Poppins_400Regular'}}>Likes</Text>
          </View>
          <View style={{ flexDirection:'column',alignItems:'center'}}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>{views}</Text>
            <Text style={{color: Colors.gray,fontSize:12, fontFamily:'Poppins_400Regular'}}>Views</Text>
          </View>
        </View>
        <Button
          mode="contained"
          labelStyle={{
            fontSize: 13, color: '#fff',
            fontFamily: 'Poppins_400Regular',
            paddingVertical:4,
          }}
          uppercase={false}
          style={{ width:200, marginTop:10,  backgroundColor:Colors.primary,borderRadius:100/2,}}
          onPress={handleFollow}>
            {label}
          </Button>
      </View>
    )
  }