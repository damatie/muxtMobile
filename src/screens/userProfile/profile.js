import { View, Text, FlatList,Dimensions, ScrollView,Image } from "react-native"
import React,{ useContext, useEffect, useState } from 'react';
import GeneralLayout from "../../layout/generalLayout"
import { Colors } from "../../utils/Colors"
import { AdCard } from "../../components/home/AdCard";
import { useDispatch, useSelector } from 'react-redux';
import { CredentialContext } from '../../store/CredentialContext';
import { ProfileCard } from "../../components/userProfile/profileCard";
import { SmallPostCard } from "../../components/userProfile/smallPostCard";
import { setAds } from "../../store/features/ads/adSlice";
import { db } from "../../firebase";
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  deleteDoc,
  where,
  orderBy
} from 'firebase/firestore';

export const Profile = ({ navigation,route }) => {
  const dispatch = useDispatch();
  const{storedCredentials} = useContext(CredentialContext)
  const deviceWidth = Dimensions.get('window').width;
  const [following, setFollowing] = useState([])
  const [likes, setLikes] = useState([])
  const [views, setViews] = useState([])
  const [oneFollower, setOneFollower] = useState([])
  const [post, setPost] = useState([])
  const { ads } = useSelector((state) => state.ads);

  // console.log(route)
// Filter following
  const filterFollowing = () => {
    const data = following.filter(obj => obj.userId === id && obj.followerId === storedCredentials)
    return setOneFollower(data)
  }
  
// Route params
  const {name,id,userImg} = route.params;
  
  // Profile card
  console.log(deviceWidth)

  const renderPosts = ({ item, index }) => {
    return (
      <SmallPostCard views={item.campaignViews}
        adImg={item.campaignImage}
        previewPost={() => navigation.navigate('PreViewPost',{
          name: item.businessName,
          id: item.userId,
          userImg:''
        },
      )}
      />
    )
  }

  // Get Following
  const getFollowing = async () => {
    try {
      const q = query(collection(db, "followers"),where("userId", "==", id));
       onSnapshot(q, (querySnapshot) => {
        const data = [];
       querySnapshot.forEach((doc) => {
        return data.push({ id: doc.id, ...doc.data() });
       });
       setFollowing(data)
      });

    } catch (err) {
      console.log(err)
    }
    
  }
   // Get Likes
  const getLikes = async () => {
    try {
      const q = query(collection(db, "likes"),where("userId", "==", id));
       onSnapshot(q, (querySnapshot) => {
        const data = [];
       querySnapshot.forEach((doc) => {
        return data.push({ id: doc.id, ...doc.data() });
       });
       setLikes(data)
      });

    } catch (err) {
      console.log(err)
    }
    
  }

  //Get views
  const getViews = async () => {
    try {
      const q = query(collection(db, "views"),where("userId", "==", id));
       onSnapshot(q, (querySnapshot) => {
        const data = [];
       querySnapshot.forEach((doc) => {
        return data.push({ id: doc.id, ...doc.data() });
       });
       setViews(data)
      });

    } catch (err) {
      console.log(err)
    }
    
  }

  // console.log(views)
  useEffect(() => {
    getFollowing();
    getLikes();
    getViews();
  }, [])
   useEffect(() => {
     if (following) {
      filterFollowing()
      }
  },[following])

  // Handle Follow
  const handleFollow = async() => {
    // console.log(id)
    // console.log(oneFollower.length)
    if (oneFollower.length === 0) {
      await addDoc(collection(db,'followers'),{
      userId:id,
      follow: true,
      followerId:storedCredentials,
      timeStamp: serverTimestamp()
    })
    } else {
      await deleteDoc(doc(db, "followers", oneFollower[0].id));
    }
    
  }

  return (
    <GeneralLayout
      back={() => navigation.goBack()}
      barStyle={'dark-content'}
      statusColor={Colors.white}
      backgroundColor={Colors.white}
      title={name}
    >
   
      <View style={{ flex: 1, flexDirection: 'column', paddingTop: 0 }}>
        
        <FlatList
          numColumns={3}
          ListHeaderComponent={
            <ProfileCard name={name}
              userImg={userImg}
              followers={following.length}
              likes={likes.length}
              views={views.length}
              handleFollow={() => handleFollow()}
              label={oneFollower.length>0? 'Unfollow': 'Follow'}
            />
          }
          data={ads.filter(obj => obj.userId === id)}
          style={{ margin:0}}
          keyExtractor={
            (item, index)=> index.toString()
          }
          renderItem={renderPosts}
        />
      </View>
    </GeneralLayout>
  )
}