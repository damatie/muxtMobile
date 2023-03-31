import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { useEffect, useState,useContext } from 'react';
import { db } from '../../firebase'
import * as React from 'react'
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  collection,
  getDoc,
  onSnapshot,
  query,
  deleteDoc,
  setDoc,
  arrayUnion,
} from 'firebase/firestore';
import { FeaturedCard } from '../../components/home/FeaturedCard';
import { AdCard } from '../../components/home/AdCard';
import { TopNav } from '../../components/home/TopNav';
import { useDispatch, useSelector } from 'react-redux';
import { setAds } from '../../store/features/ads/adSlice';
import { setInchat } from '../../store/features/chats/chatSlice';
import { CredentialContext} from '../../store/CredentialContext';
import { Colors } from '../../utils/Colors';
import { PostPreviewModal } from '../../components/shared/postPreviewModal';
import { getCampaigns,getAll } from '../../utils/hooks/useGetAds';
import { toggleModal } from '../../utils/hooks/usePostModal';
import {handleLike} from '../../utils/hooks/useHandleLike'
import { handleChat, getInChat } from '../../utils/hooks/useChat';
import { handleShare } from '../../utils/hooks/useShare';

export const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const{storedCredentials} = useContext(CredentialContext)
  const { ads } = useSelector((state) => state.ads);
  const {inChat} = useSelector((state)=> state.chat)
  const [likesTemp, setLikesTemp] = useState([])
  const [views, setViews] = useState([])
  const [adsTemp, setAdsTemp] = useState([])
  const [usersInfo, setUsersInfo] = useState([])
  const deviceWidth = Dimensions.get('window').width;
  const [isMounted, setIsMounted] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [statusBg, setStatusBg] = useState('white')
  const [statusContent, setStatusContent] = useState('dark-content')
  const [zoomItem, setZoomItem] = useState(null)
  const [campaignInfo, setCampaignInfo] = useState(null)
  const [onView, setOnview] = useState('')
  // const [showMore, setShowMore] = useState(false)
  

  // console.log(showMore)
 //  Handle views
  const handleView = React.useRef((viewableItems) => {
    let data = viewableItems.viewableItems[0]
    // console.log(data.item.views[0] && data.item.views[0].view)
    // console.log(data.item.id)
    setOnview(data.item.id) 
    // setShowMore(false)
    let newState = data.item.views && data.item.views.filter((view) =>  view.viewerId===storedCredentials).map((obj) => {
      return obj
    })
    
    if (data.isViewable && storedCredentials) { 
      if (newState.length===0) {
         addDoc(collection(db,'views'),{
          viewerId:storedCredentials,
          view: true,
          userId:data.item.userId,
          campaignId: data.item.id,
          timeStamp: serverTimestamp()
         })
         updateDoc(doc(db,'campaigns', data.item.id),{
          campaignViews:data.item.campaignViews +1
        })
      } 
  }
  })
  // View area and time
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50, minimumViewTimez: 1000, })

  useEffect(() => {
    let isLoaded = true
    if (isLoaded) {
      getCampaigns(
        setAdsTemp,
        setUsersInfo,
        setLikesTemp,
        setViews
      );
      getInChat(setInchat,dispatch)
    }
    return () => {
      // cancel the subscription
      getCampaigns(
          setAdsTemp,
          setUsersInfo,
          setLikesTemp,
          setViews
       );
      isLoaded = false
    };
  }, [])

  useEffect(() => {
    let isLoaded = true
    if(isLoaded){
       if (adsTemp && likesTemp,views) {
         getAll(
          adsTemp,
          views,
          likesTemp,
          usersInfo,
          setAds,
          dispatch
        )
     }
    }
     return () => {
        // cancel the subscription
       isLoaded = false
       setIsMounted(false)
       getAll(
        adsTemp,
        views,
        likesTemp,
        usersInfo,
        setAds,
        dispatch
        )
    };
  }, [adsTemp, likesTemp, views, inChat,usersInfo,onView])
  
  // console.log(inChat)
  
  
  // Ads list
  const renderAds = ({ item, index }) => {
    // console.log("users",item.users[index]?.fileUrl)
    let clildLike;
    clildLike = item.likes.filter((obj) => obj.campaignId === item.id && obj.likerId === storedCredentials).map((element) => {
      return(element)
    })

    const likeCount = item.likes.filter((obj) => obj.liked === true)
    const user = item.users.filter((obj) => obj.id === item.userId)
    // console.log(user[0])
    return (
      <>
      <AdCard
      handleLike={() => handleLike(storedCredentials,clildLike, item.id, item.campaignLikes, item.userId)}
      handleShare={() => handleShare(item.id, item.userId)}
      // handleMore={setShowMore}
      // showMore = {showMore}
          
      handleModal={() => toggleModal(
        setModalVisible,
        isModalVisible,
        setZoomItem,
        setCampaignInfo,
        item?.campaignImage,
        item
      )}
      data={item}
      onView={onView}
      user={user[0]}
      likes={likeCount.length}
      handleChat={()=>handleChat(storedCredentials,item?.campaignImage,item.userId, item?.videoPreview)}
      liked={clildLike[0] && clildLike[0].liked}
      viewProfile={() => navigation.navigate('UserProfile', {
      screen: 'Profile',
      params: {
        name: user[0]?.businessData?.businessName,
        id: item.userId,
        userImg:user[0]?.fileUrl
      },
      }
      )}
        />
      </>
    )
  }

    return (
      <>
        <StatusBar
          barStyle={statusContent}
          backgroundColor={statusBg}
        />
        
        <TopNav />
        <View style={{  backgroundColor:Colors.offWhite,flex:1}}>
          <View style={{
            flexDirection: 'column',
            paddingTop: 0,
            alignItems:'center'
          }}>
            {/* Ads card */}
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ads}
              stickyHeaderIndices={[0]}
              renderItem={renderAds}
              contentContainerStyle={{
                alignItems: "stretch", width: deviceWidth, paddingBottom: 5,
              }}
              keyExtractor={(item, index) => (item.id, index)}
              viewabilityConfig={viewConfigRef.current}
              onViewableItemsChanged={handleView.current}
              ListHeaderComponent={
              <View>
                  <FeaturedCard />
              </View>
              }
            />
          </View> 
        </View>
        <PostPreviewModal
          toggleModal={() => {
            toggleModal(
              setModalVisible,
              isModalVisible,
          )}}
          isModalVisible={isModalVisible}
          zoomItem={zoomItem}
          setZoomItem={setZoomItem}
          campaignInfo={campaignInfo}
        />
    </>
  );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
