import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import TimeAgo from 'react-native-timeago';

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

export const AdCard = ({
  merchantName,
  merchantImg,
  time,
  campaignTitle,
  campaignImg,
  content,
  likes,
  shares,
  handleLike

}) => {
  const deviceWidth = Dimensions.get('window').width;
  console.log(deviceWidth)
  return (
    <>
      <View style={{
        backgroundColor: '#fff',
        height: 530,
        paddingBottom: 7,
        paddingTop:10,
        marginBottom: 5,
        borderRadius: 0
               
      }}>
        {/* Card Head */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, position: 'relative' }}>
          <View style={{ flex:1, flexDirection: 'row', backgroundColor:'white' }}>
            <View style={{ height: 40, width: 40, borderRadius: 40 / 2, backgroundColor: '#eef', marginRight: 10, alignItems: 'flex-start' }}>
              <Image
              source={{uri:merchantImg}}
              style={{
              width: '100%',
              height:'100%',
              flex: 1,
              resizeMode: 'contain',
              borderRadius:100/2
            }}
            />
             
            </View>
            <View style={{ marginTop:3}}>
              <Text style={{ fontWeight:'900', fontFamily:'Poppins_600SemiBold'}}>
                {merchantName}
              </Text>
              <Text style={{ fontSize:10, fontFamily:'Poppins_400Regular'}}>
                {/* {time} ago */}
                <TimeAgo time={time*1000} interval={20000} />
              </Text>
            </View>
          </View>
          <View style={{ textAlign:'right',  position:'absolute', right:0, top:17}}>
            <MaterialIcons name="more-vert" size={25} color="black" />
          </View>
        </View>
        {/* Card Image */}
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}>
          <Image
            source={{uri:campaignImg}}
            style={{
              width: '100%',
              height:'100%',
              flex: 1,
              resizeMode: deviceWidth>700? 'cover': 'contain',
            }}
      />
        </View>
          {/* Card Footer */}
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 10, position: 'relative', }}>
          <View style={{ flexDirection: "row", backgroundColor:'#fff', paddingTop: 0, paddingBottom:4}}>
            <View style={{ flex:1, }}>
              <View style={{ flexDirection: 'row', width: 60, justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={handleLike}
                >
                 <AntDesign name="like2" size={24} color="black" />
                </TouchableOpacity>
                  
                  <Ionicons name="md-share-outline" size={24} color="black" />
              </View>
            </View>
              <View>
                <MaterialIcons name="favorite-border" size={24} color="black" />
            </View>
          </View>
          {/* Icons */}
          
          <Text style={{ fontSize:12, fontFamily:'Poppins_600SemiBold', marginBottom:-2}}>
            {campaignTitle}
          </Text>
          <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', paddingBottom: 7 }}>
            {content}
          </Text>
          <View style={{ flexDirection: 'row', backgroundColor:'#fff',}}>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11, marginRight: 10, marginLeft: 0, flex:1 }}> {likes} Likes .</Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11,flex:1 }}> {shares} Shares. </Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11,flex:1 }}> { shares} Views </Text>
          </View>
         
        </View>
      </View>
    </>
  )
  
}