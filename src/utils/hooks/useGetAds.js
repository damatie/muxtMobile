import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

  // Get Published Ads
export const getCampaigns = async (
  setAdsTemp,
  setUsersInfo,
  setLikesTemp,
  setViews,

) => {
    
  
    try {
      const q = query(collection(db, "campaigns"), where("campaignStatus", "==", true), orderBy("timeStamp", "desc"));
      onSnapshot(q, (querySnapshot) => {
        const data = [];
       querySnapshot.forEach((doc) => {
        return data.push({ id: doc.id, ...doc.data() });
       });
       setAdsTemp(data)
      });
      
        // Get user info 
      const q1 = query(collection(db, "users"));
      onSnapshot(q1, (querySnapshot) => {
        const dataUsers = [];
      querySnapshot.forEach((doc) => {
        return dataUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsersInfo(dataUsers)
        
      });

      // Likes 
      const q2 = query(collection(db, "likes"));
      onSnapshot(q2, (querySnapshot) => {
        const dataLikes = [];
      querySnapshot.forEach((doc) => {
        return dataLikes.push({ id: doc.id, ...doc.data() });
      });
      setLikesTemp(dataLikes)
        
      });
      
       // Views 
      const q3 = query(collection(db, "views"));
      onSnapshot(q3, (querySnapshot) => {
        const dataViews = [];
      querySnapshot.forEach((doc) => {
        return dataViews.push({ id: doc.id, ...doc.data() });
      });
      setViews(dataViews)
     });
      
    } catch (err) {
      console.log(err)
    }
}
  
 // Get Published Ads and Likes for each
export const getAll = (
  adsTemp,
  views,
  likesTemp,
  usersInfo,
  setAds,
  dispatch

  ) => {
   const newState = adsTemp.map((element) => {
     const viewsData = views && views.filter((view) => view.campaignId === element.id).map((item) => {
        return item  
     })
     const likes = likesTemp && likesTemp.filter((likes) => likes.campaignId === element.id ).map((item) => {
            return item  
     })
     
      const users = usersInfo && usersInfo.filter((user) => user.id === element.userId ).map((item) => {
            return item  
      })
     return {
       ...element,
      users:users ||null,
      likes: likes || null,
      views: viewsData || null
     }
   })
    dispatch(setAds(newState))
  }