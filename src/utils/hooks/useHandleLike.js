
import { db } from "../../firebase"
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  collection,
  deleteDoc,

} from 'firebase/firestore';

// Handle Like
export const handleLike = async (
  storedCredentials,
  value,
  cid,
  likeCount,
  mId
) => {
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
