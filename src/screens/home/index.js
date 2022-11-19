import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useEffect, useState,useContext } from 'react';
import { db } from '../../firebase'
import * as React from 'react'
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import { FeaturedCard } from '../../components/home/FeaturedCard';
import { AdCard } from '../../components/home/AdCard';
import { TopNav } from '../../components/home/TopNav';
import { useDispatch, useSelector } from 'react-redux';
import { setAds } from '../../store/features/ads/adSlice';
import { CredentialContext} from '../../store/CredentialContext';
import { Colors } from '../../utils/Colors';
import { PostPreviewModal } from '../../components/shared/postPreviewModal';

export const Home = ({navigation}) => {

  const dispatch = useDispatch();
  const{storedCredentials} = useContext(CredentialContext)
  const { ads } = useSelector((state) => state.ads);
  const [likesTemp, setLikesTemp] = useState([])
  const [views, setViews] = useState([])
  const [adsTemp, setAdsTemp] = useState([])
  const deviceWidth = Dimensions.get('window').width;
  const [isMounted, setIsMounted] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [statusBg, setStatusBg] = useState('white')
  const [statusContent, setStatusContent] = useState('dark-content')
  const [zoomItem, setZoomItem] = useState(null)
  const [campaignInfo, setCampaignInfo] = useState(null)
  const [zoomItemSize, setZoomItemSize] = useState()
  

  // Handle img sizes
  // if (zoomItem !== null) {
  //   Image.getSize(zoomItem, (width, height) => {
  //   setZoomItemSize({ width, height });
  //   });
  // }
  // Handle modal
  const toggleModal = (itemImage, item) => {
    setModalVisible(!isModalVisible);
    if (isModalVisible !== true) {
      console.log(isModalVisible)
      setZoomItem([{
        url:itemImage ,
        props: {}
      }])
      setCampaignInfo(item)
      
    }
  };

  // Get Published Ads
  const getCampaigns = async () => {
    try {
      const q = query(collection(db, "campaigns"), where("campaignStatus", "==", true), orderBy("timeStamp", "desc"));
      onSnapshot(q, (querySnapshot) => {
        const data = [];
       querySnapshot.forEach((doc) => {
        return data.push({ id: doc.id, ...doc.data() });
       });
       setAdsTemp(data)
      });
      
      
      // Likes 
      const q2 = query(collection(db, "likes"));
      onSnapshot(q2, (querySnapshot) => {
        const dataLikes = [];
      const data= querySnapshot.forEach((doc) => {
        return dataLikes.push({ id: doc.id, ...doc.data() });
      });
      setLikesTemp(dataLikes)
        
      });
      
       // Views 
      const q3 = query(collection(db, "views"));
      onSnapshot(q3, (querySnapshot) => {
        const dataViews = [];
      const data= querySnapshot.forEach((doc) => {
        return dataViews.push({ id: doc.id, ...doc.data() });
      });
      setViews(dataViews)
     });
      
    } catch (err) {
      console.log(err)
    }
  }
//  console.log(views)
  // console.log(views)
  // Get Published Ads and Likes for each
  const getAll = () => {
   const newState = adsTemp.map((element) => {
     const viewsData = views && views.filter((view) => view.campaignId === element.id).map((item) => {
        return item  
     })
     const data = likesTemp && likesTemp.filter((likes) => likes.campaignId === element.id ).map((item) => {
            return item  
      })
    //  console.log({
    //    campaign: element,
    //    likes:data.length>0? data : null,
    //     views: viewsData || null
    //   })
    return {...element,
      likes: data || null,
      views: viewsData || null
     }
   })
    dispatch(setAds(newState))
  }
  // console.log(ads)
// Handle Like
  const handleLike = async (value, cid, likeCount, mId) => {
    const newValue = value[0] && value[0]
    if (storedCredentials) {
      //  console.log("testing like function")
      if (value.length === 0) {
        await addDoc(collection(db, 'likes'), {
          likerId: storedCredentials,
          userId: mId,
          liked: true,
          campaignId: cid,
          timeStamp: serverTimestamp()
        })
          updateDoc(doc(db,'campaigns', cid),{
          campaignLikes: likeCount + 1,
        })
      } else {
        await deleteDoc(doc(db, "likes", newValue.id));
         updateDoc(doc(db,'campaigns', cid),{
         campaignLikes:likeCount-1
        })
      }
    }
  }

 //  Handle views
  const handleView = React.useRef((viewableItems) => {
   
    let data = viewableItems.viewableItems[0]
    // console.log(data.item.views[0] && data.item.views[0].view)
    
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
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50, minimumViewTimez: 1000, })

  // Handle share
  const handleShare = async (campaignId,userId) => {
    try {
      console.log('re posted')
       addDoc(collection(db,'shares'),{
          sharerId:storedCredentials,
          userId:userId,
          campaignId: campaignId,
          timeStamp: serverTimestamp()
         })
    } catch (error) {
    }
  };

 
  useEffect(() => {
    let isLoaded = true
    if (isLoaded) {
      getCampaigns();
    }
    return () => {
        // cancel the subscription
       getCampaigns();
      isLoaded = false
    };
  }, [])

  useEffect(() => {
    let isLoaded = true
    
    if(isLoaded){
       if (adsTemp && likesTemp,views) {
       getAll()
     }
    }
     return () => {
        // cancel the subscription
       isLoaded = false
       setIsMounted(false)
        getAll()
    };
  }, [adsTemp,likesTemp,views])
  
  
  // Ads list
  const renderAds = ({ item, index }) => {
    let clildLike;
    clildLike = item.likes.filter((obj) => obj.campaignId === item.id && obj.likerId === storedCredentials).map((element) => {
      return(element)
    })

    const likeCount = item.likes.filter((obj, objIndex) => obj.liked === true)

    return (
      <>
      <AdCard
      handleLike={() => handleLike(clildLike, item.id, item.campaignLikes, item.userId)}
      handleShare={() => handleShare(item.id, item.userId)}
      handleModal={()=>toggleModal(item?.campaignImage, item)}
      id={item.id}
      isVideo={item?.videoPreview}
      zoomItemSize={zoomItemSize&&zoomItemSize }
      merchantName={item.businessName}
      time={item?.timeStamp?.seconds}
      merchantImg={`${item.userImg}`}
      campaignTitle={item.campaignTitle}
      campaignImg={`${item?.campaignImage}`}
      content={item.campaignDescription}
      likes={likeCount.length}
      views={item.campaignViews}
      shares={item.campaignShare}
      liked={clildLike[0] && clildLike[0].liked}
      viewProfile={() => navigation.navigate('UserProfile', {
      screen: 'Profile',
      params: {
        name: item.businessName,
        id: item.userId,
        userImg:item.userImg
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
          toggleModal={toggleModal}
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
