import * as React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity,Button,TouchableNativeFeedback  } from 'react-native';
import TimeAgo from 'react-native-timeago';
import { Video, AVPlaybackStatus } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Colors } from '../../utils/Colors';


export const AdCard = ({
  merchantName,
  merchantImg,
  time,
  campaignTitle,
  campaignImg,
  content,
  likes,
  views,
  id,
  isVideo,
  shares,
  rePost,
  handleShare,
  handleLike,
  liked = false,
  viewProfile,
  handleModal,

}) => {
  const deviceWidth = Dimensions.get('window').width;
  // console.log(deviceWidth)

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <>
      <View style={{
        backgroundColor: '#fff',
        paddingBottom: 7,
        paddingTop:10,
        marginBottom: 4,
        marginHorizontal:0,
        borderRadius: 10,
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor:Colors.offWhite,
        shadowOpacity: 0.2,
      }}>
        {/* Card Head */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom:8, position: 'relative' }}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
             <TouchableOpacity
                onPressIn={viewProfile}
              >
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
              </TouchableOpacity>
            <View style={{ marginTop: 3 }}>
              <TouchableOpacity
                onPressIn={viewProfile}
              >
                 <Text style={{ fontWeight:'900', fontFamily:'Poppins_600SemiBold'}}>
                {merchantName}
              </Text>
                
             
              <Text style={{ fontSize:10, fontFamily:'Poppins_400Regular', color:Colors.gray}}>
                {/* <TimeAgo time={time*1000} interval={20000} /> */}
                Sponsored
                </Text>
                </TouchableOpacity>
            </View>
          </View>
          <View style={{ textAlign:'right',  position:'absolute', right:0, top:6}}>
            {/* <MaterialIcons name="more-vert" size={25} color="black" /> */}
          </View>
        </View>
        {/* Card Image */}
        
        <View style={{
          position:'relative',
          minHeight:280,
          backgroundColor: '#fff',
          overflow: 'hidden',
          alignItems: 'center',
        }}>
          {!isVideo?<TouchableNativeFeedback
            onPressIn={handleModal}
            style={{ height: 50, width: 50, zIndex: 1, position:'absolute', right:10}}
          >
            <MaterialIcons name="zoom-out-map" size={20} color="white" style={{ position:'absolute', zIndex:1, right:10, top:5, backgroundColor: 'rgba(52, 52, 52, 0.8)', borderRadius:50, padding:10,}} />
          </TouchableNativeFeedback> : <></>}
              
           {!isVideo ?<Image
            source={{uri:campaignImg}}
            style={{
              width: '100%',
              flex: 1,
              height:'100%',
              resizeMode: deviceWidth >600? 'contain': 'cover',
            }}
          />
            :
            <>
            <Video
              ref={video}
                style={{
                    flex: 1,
                    width: deviceWidth, 
                  alignSelf: 'stretch'
                }}
          
            source={{
              uri:campaignImg || null ,
            }}
                resizeMode="cover"
                shouldPlay= {false}
                isLooping={true}
                shouldCorrectPitch= {false}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />

              {/* Controls */}
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right:5
                }}
                onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}>
                <Text style={{
                  backgroundColor: Colors.primaryLight,
                  width:30,
                  height: 30,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  borderRadius: 50 / 2,
                  color:Colors.primaryLight
                }}>
                  {status.isPlaying ?
                    <Ionicons name="md-pause-circle-outline" size={24} color={Colors.white} /> :
                    <Ionicons name="ios-play-circle-outline" size={24} color={Colors.white} />
                    }
                </Text>
              </TouchableOpacity>
            </>
           }
          
          
        </View>
          {/* Card Footer */}
        <View style={{ paddingHorizontal: 10, position: 'relative', }}>
          <View style={{ flexDirection: "row",  paddingTop: 10, paddingBottom:4}}>
            <View style={{ flex:1, }}>
              <View style={{ flexDirection: 'row', width: 60, justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={handleLike}
                >
                 <AntDesign name={liked===true? 'like1':'like2'} size={24} color={liked===true? Colors.bluePrimary:'black'} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
                <TouchableOpacity
                  onPress={handleShare}
                >
                  <Ionicons name="md-share-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
          </View>
          {/* Icons */}
          
          <Text style={{ fontSize:12, fontFamily:'Poppins_600SemiBold', marginBottom:-2, textTransform:'capitalize'}}>
            {campaignTitle&&campaignTitle.substring(0, 46)}{campaignTitle&&campaignTitle.length>46? '...': ''}
          </Text>
          <Text style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', paddingBottom: 7 }}>
            {content&& content.substring(0, 50)}{content&&content.length>50? '...': ''}
             more
          </Text>
          <View style={{ flexDirection: 'row', backgroundColor:'#fff', }}>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11, marginRight: 10, marginLeft: 0, flex:1 }}> {likes} Likes .</Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11, flex: 1 }}> {shares} Shares. </Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11,flex:1 }}> {views} Views </Text>
          </View>
         
        </View>
      </View>
    </>
  )
  
}
