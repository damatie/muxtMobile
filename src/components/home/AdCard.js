import * as React from 'react'
import { useEffect,useState } from 'react';
import {
  Platform,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import TimeAgo from 'react-native-timeago';
import { Video, AVPlaybackStatus } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Colors } from '../../utils/Colors';
import * as Linking from 'expo-linking';
 import * as WebBrowser from 'expo-web-browser';

export const AdCard = ({
  likes,
  data,
  user={},
  handleShare,
  handleLike,
  liked = false,
  viewProfile,
  handleModal,
  handleChat,
  onView,

}) => {
  const deviceWidth = Dimensions.get('window').width;
  const time=data?.timeStamp?.seconds
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [showMore, setShowMore] = useState(false)

  // show more text content 
  const checkShowMore = () => {
    if (onView === data.id) {
      return false
    } else {
      return true
    }
  }

  // Open web url
  const openWebUrl = (url) => WebBrowser.openBrowserAsync(url)

  useEffect(() => {
    if (data?.videoPreview) {
      if (onView===data.id) {
      video.current.playAsync()
    } else {
      video.current.pauseAsync()
    }
  }
  },[onView])
  return (
    <>
      <View style={{
        backgroundColor: '#fff',
        paddingBottom: 7,
        paddingTop:10,
        marginBottom: 4,
        marginHorizontal:0,
        borderBottomWidth: 1,
        borderBottomColor:Colors.offWhite,
      }}>
        {/* Card Head */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom:8, position: 'relative' }}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
             <TouchableOpacity
                onPressIn={viewProfile}
              >
            <View style={{ height: 40, width: 40, borderRadius: 40 / 2, backgroundColor: '#eef', marginRight: 10, alignItems: 'flex-start' }}>
           
              <Image
              source={{uri:user?.fileUrl || null}}
              style={{
              width: '100%',
              height:'100%',
              flex: 1,
              resizeMode: Platform.OS==='ios'? 'cover':'contain',
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
                {user?.businessData?.businessName}
              </Text>
                
             
              <Text style={{ fontSize:10, fontFamily:'Poppins_400Regular', color:Colors.gray}}>
                    Sponsored 
                  {" " } <TimeAgo time={time*1000} interval={20000} />
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
          {!data?.videoPreview?<TouchableOpacity
            onPressIn={handleModal}
            style={{ height: 40, width: 40, backgroundColor:'green', borderRadius:50, backgroundColor: 'rgba(52, 52, 52, 0.8)',  zIndex: 1, position:'absolute', right:20}}
          >
              <MaterialIcons name="zoom-out-map" size={20} color="white" style={{ position:'absolute', zIndex:1, right:0, top:0,  padding:10,}} />
          </TouchableOpacity> : <></>}
              
           {!data?.videoPreview ?<Image
            source={{uri:data.campaignImage || null}}
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
              uri:data.campaignImage || null ,
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
                  top: 10,
                  right:5
                }}
                onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}>
                <View style={{
                  backgroundColor: Colors.primaryLight,
                  width:30,
                  height: 30,
                  flexDirection: 'column',
                  paddingLeft: Platform.OS === 'ios' ? 3.5 : 3.5,
                  paddingTop:Platform.OS === 'ios' ? 1.6 : 2,
                  borderRadius: 50 / 2,
                  color:Colors.primaryLight
                }}>
                  {status.isPlaying ?
                    <Ionicons name="md-pause-circle-outline" size={24} color={Colors.white} /> :
                    <Ionicons name="ios-play-circle-outline" size={24} color={Colors.white} />
                    }
                </View>
              </TouchableOpacity>
            </>
          }
         
          {data.connectOption && <TouchableHighlight
            underlayColor={Colors.primary}
            onPressIn={data?.connectOption ==='BUTTON'?handleChat : ()=> openWebUrl(data.campaignWebsite) }
          style={{ zIndex: 1, width: '100%', position: 'absolute', bottom: 0, paddingHorizontal: 10, backgroundColor: Colors.primary, }}>
            <View style={{ paddingTop:Platform.OS === 'ios' ? 10 : 10, paddingBottom:Platform.OS === 'ios' ? 6 : 6, flexDirection:'row'}}>
              <Text style={{ color: 'white', textTransform: 'capitalize', fontWeight: 'bold', flex:1  }}>
            {data?.connectOption ==='LINK'? 'Visit website': ' Chat me up '}
              </Text>
              <MaterialIcons name="keyboard-arrow-right" style={{ marginTop:-2}} size={24} color={Colors.white} />
            </View>
          </TouchableHighlight>}
          
        </View>
          {/* Card Footer */}
        <View style={{ paddingHorizontal: 10, position: 'relative', }}>
          <View style={{ flexDirection: "row",  paddingTop: 14, paddingBottom:7}}>
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
          
          <Text style={{ fontSize:12, fontFamily:'Poppins_600SemiBold', marginBottom:2, textTransform:'capitalize'}}>
            {data.campaignTitle&&data.campaignTitle.substring(0, 46)}{data.campaignTitle&&data.campaignTitle.length>46? '...': ''}
          </Text>
          <TouchableHighlight
            underlayColor="none"
            disabled={checkShowMore()}
            onPress={()=>setShowMore(!showMore)}
          >
            <>
            <Text
                style={{ fontSize: 11, fontFamily: 'Poppins_400Regular', userSelect:'none',fontStyle:'none', paddingBottom: 9 }}>
              {data.campaignDescription && !showMore ? data.campaignDescription.substring(0, 90) :
                data.campaignDescription.substring(0)}{!showMore && data.campaignDescription && data.campaignDescription.length > 90 ? '... See more' : ''}
            </Text>
            {showMore &&<Text
            style={{ fontSize: 12, color:'gray', fontFamily: 'Poppins_400Regular', textAlign:'center', userSelect:'none',fontStyle:'none', paddingBottom: 7, marginTop:-5 }}>
              {showMore && data.campaignDescription && data.campaignDescription.length > 90 ? ' See less' : ''}
            </Text>}
            </>
         </TouchableHighlight>
          <View style={{ flexDirection: 'row', backgroundColor:'#fff', }}>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11, marginRight: 10, marginLeft: 0, flex:1 }}> {likes} Likes</Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11, flex: 1 }}> {data.campaignShare} Shares </Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11,flex:1 }}> {data.campaignViews} Views </Text>
          </View>
         
        </View>
      </View>
    </>
  )
  
}
