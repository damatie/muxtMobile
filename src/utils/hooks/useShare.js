import { db } from '../../firebase';
import {
  serverTimestamp,
  updateDoc,
  doc,
  collection,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  arrayUnion,
} from 'firebase/firestore';


 // Handle share
 export  const handleShare = async (campaignId,userId) => {
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