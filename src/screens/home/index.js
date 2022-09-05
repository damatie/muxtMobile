import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  FlatList

} from 'react-native';import { useEffect, useState } from 'react';
import {db,auth} from '../../firebase'
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
  orderBy
} from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { FeaturedCard } from '../../components/home/FeaturedCard';
import { AdCard } from '../../components/home/AdCard';
import { TopNav } from '../../components/home/TopNav';
import { useDispatch, useSelector } from 'react-redux';
import { setAds } from '../../store/features/ads/adSlice';
import { useContext } from 'react';
import { CredentialContext } from '../../store/CredentialContext';
import { async } from '@firebase/util';

export const Home = () => {
  const dispatch = useDispatch();
   const{storedCredentials} = useContext(CredentialContext)
  const { ads } = useSelector((state) => state.ads);
  const [likesTemp, setLikesTemp] = useState([])
  const [adsTemp, setAdsTemp] = useState([])
  const deviceWidth = Dimensions.get('window').width;
  const [isMounted, setIsMounted] = useState(false)

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
      
    } catch (err) {
      console.log(err)
    }
  }

  // Get Published Ads and Likes for each
  const getAll = () => {
   const newState = adsTemp.map((element) => {
     const data = likesTemp && likesTemp.filter((likes) => likes.campaignId === element.id ).map((item, index) => {
            return item  
      })
    //  console.log({
    //    campaign: element,
    //    likes:data.length>0? data : null
    //   })
    return {...element,
       likes:data|| null
     }
   })
    dispatch(setAds(newState))
  }
// Handle Like
  const handleLike = (value, cid,likeCount,viewsCount) => {
    const newValue = value[0] && value[0]
    if (storedCredentials) {
       console.log("testing like function")
      if (value.length===0) {
        addDoc(collection(db,'likes'),{
          userId:storedCredentials,
          liked: true,
          campaignId:cid,
          timeStamp: serverTimestamp()
        })

        updateDoc(doc(db,'campaigns', cid),{
          campaignLikes: likeCount + 1,
          campaignViews:viewsCount +1
        })
        
      } else {
        console.log('update like')
        console.log(newValue)
        updateDoc(doc(db,'likes', newValue.id),{
          liked:!newValue.liked
        })
        if (newValue.liked===false) {
          updateDoc(doc(db,'campaigns', cid),{
         campaignLikes:likeCount+1
        })
        } else {
          updateDoc(doc(db,'campaigns', cid),{
         campaignLikes:likeCount-1
        })
        }
      }
    }
  }
 //  Handle views
  const handleView = () => {
    console.log('new views')
  }
 
  useEffect(() => {
    let isLoaded = true
    if (isLoaded) {
      getCampaigns();
    }
    return () => {
        // cancel the subscription
      isLoaded = false
    };
  }, [])

  useEffect(() => {
    let isLoaded = true
    
    if(isLoaded){
       if (adsTemp && likesTemp) {
       getAll()
     }
    }
     return () => {
        // cancel the subscription
       isLoaded = false
       setIsMounted(false)
      
    };
   
  }, [adsTemp,likesTemp, ])
  


  

  const renderAds = ({ item, index }) => {
    let clildLike;
    clildLike = item.likes.filter((obj) => obj.campaignId === item.id && obj.userId === storedCredentials).map((element) => {
      return(element)
    })

    const likeCount = item.likes.filter((obj, objIndex) => obj.liked === true)
    console.log(item.campaignViews)
  //  handleLike={() => handleLike(clildLike, item.id)}
    return (
      <AdCard
        handleLike={() => handleLike(clildLike, item.id, item.campaignLikes, item.campaignViews)}
      id={item.id}
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
       
    />
    )
  }

    return (
      <>
        <TopNav/>
        <View style={{  backgroundColor: '#E6EBED',flex:1  }}>
          {/* <FeaturedCard/> */}
          <View style={{
            flexDirection: 'column',
            paddingTop:5,
            alignItems:'center'
          }}>
            {/* Ads card */}
            <FlatList
              OnEndReached={handleView}
              onEndReachedThreshold={2}
              showsVerticalScrollIndicator={false}
              data={ads}
              renderItem={renderAds}
              contentContainerStyle={{alignItems: "stretch", width:deviceWidth,paddingBottom:5,
             }}
              keyExtractor={(item, index) =>( item.id, index)}
            />
          </View>
        </View>
    </>
  );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },


});
