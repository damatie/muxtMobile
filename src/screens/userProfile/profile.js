import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GeneralLayout from "../../layout/generalLayout";
import { Colors } from "../../utils/Colors";
import { AdCard } from "../../components/home/AdCard";
import { useDispatch, useSelector } from "react-redux";
import { CredentialContext } from "../../store/CredentialContext";
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
  orderBy,
} from "firebase/firestore";

export const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { storedCredentials } = useContext(CredentialContext);
  const deviceWidth = Dimensions.get("window").width;
  const [following, setFollowing] = useState([]);
  const [likes, setLikes] = useState([]);
  const [views, setViews] = useState([]);
  const [oneFollower, setOneFollower] = useState([]);
  const [post, setPost] = useState([]);
  const { ads } = useSelector((state) => state.ads);
  const [isMounted, setIsMounted] = useState(true);

  // console.log(route)
  // Filter following
  const filterFollowing = () => {
    const data = following.filter((obj) => obj.userId === id);
    return setOneFollower(data);
  };

  // Route params
  const { name, id, userImg } = route.params;

  // Profile card
  // console.log(route)

  const renderPosts = ({ item, index }) => {
    return (
      <SmallPostCard
        videoPreview={item.videoPreview}
        views={item.campaignViews}
        adImg={item.campaignImage}
        previewPost={() =>
          navigation.navigate("PreViewPost", {
            name: item?.users[0]?.businessData?.businessName,
            id: item.userId,
            userImg: item?.users[0]?.fileUrl,
            path: `'PreViewPost/'${item.userId}`,
          })
        }
      />
    );
  };

  // Get Following
  const getFollowing = async () => {
    try {
      const q = query(collection(db, "followers"), where("userId", "==", id));
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          return data.push({ id: doc.id, ...doc.data() });
        });
        setFollowing(data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Get Likes
  const getLikes = async () => {
    try {
      const q = query(collection(db, "likes"), where("userId", "==", id));
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          return data.push({ id: doc.id, ...doc.data() });
        });
        setLikes(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Get views
  const getViews = async () => {
    try {
      const q = query(collection(db, "views"), where("userId", "==", id));
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          return data.push({ id: doc.id, ...doc.data() });
        });
        setViews(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(views)
  useEffect(() => {
    if (isMounted) {
      getFollowing();
      getLikes();
      getViews();
      filterFollowing();
    }
    return () => {
      // cancel the subscription
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (following) {
      filterFollowing();
    }
    return () => {
      // cancel the subscription
      filterFollowing();
    };
  }, [following]);

  // Handle Follow
  const getOneFollower = oneFollower.filter(
    (obj) => obj.followerId === storedCredentials
  );
  const handleFollow = async () => {
    // console.log(id)
    // console.log(oneFollower.length)
    if (getOneFollower.length > 0) {
      await deleteDoc(doc(db, "followers", oneFollower[0].id));
      console.log("exiting", getOneFollower);
    } else {
      console.log("new");
      await addDoc(collection(db, "followers"), {
        userId: id,
        follow: true,
        followerId: storedCredentials,
        timeStamp: serverTimestamp(),
      });
    }
  };

  return (
    <GeneralLayout
      back={() => navigation.goBack()}
      barStyle={"dark-content"}
      statusColor={Colors.white}
      backgroundColor={Colors.white}
      title={""}
      mainBg={Colors.offWhite}
    >
      <View style={{ flex: 1, flexDirection: "column", paddingTop: 0 }}>
        <FlatList
          numColumns={3}
          ListHeaderComponent={
            <ProfileCard
              name={name}
              userImg={userImg}
              followers={following.length}
              likes={likes.filter((obj) => obj.liked === true).length}
              views={views.length}
              handleFollow={() => handleFollow()}
              label={getOneFollower.length > 0 ? "Unfollow" : "Follow"}
            />
          }
          data={ads.filter((obj) => obj.userId === id)}
          style={{ margin: 0 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPosts}
        />
      </View>
    </GeneralLayout>
  );
};
