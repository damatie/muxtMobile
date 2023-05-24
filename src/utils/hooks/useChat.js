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


 //         {
  //           msg: 'It was good thank God for today? ',
  //           senderId:storedCredentials,
  //           time:serverTimestamp(),
  //           status:'read'
  //         }
  //       ]

//   const dateTime = (value,) => {
//   const date = new Date(value);
//     const humanDate = date.toDateString()
//     return humanDate
// }


  // Get users in your chat list
export const getInChat = async (
  setInchat,
  dispatch
  ) => {
    try {
      const q = query(collection(db, "inChat",));
      onSnapshot(q, (querySnapshot) => {
        const data = [];
       querySnapshot.forEach((doc) => {
        return data.push({ id: doc.id, ...doc.data() });
       });
       dispatch(setInchat(data))
        // console.log(data)
      });
      
    
    } catch (err) {
      console.log(err)
    }
  }

  // Handle first chat from ads  item?.campaignImage,item.userId,
export const handleChat = async (
  storedCredentials,
  campaignImage,
  ownerId,
  videoPreview
) => {
    const combined = storedCredentials + ownerId
    const chatsRef = doc(db, "chats", combined);
    const inChatUserRef = doc(db, "inChat", combined);
    const inChatOwnerRef = doc(db, "inChat", ownerId);
    const timeSent = new Date()

    try {
      
      const inChatUserSnap = await getDoc(inChatUserRef);
      const inChatOwnerSnap = await getDoc(inChatOwnerRef);
      const docSnap = await getDoc(chatsRef);

      // check if user exist in your chat
      
       
      if (!inChatUserSnap.exists()) {
         await setDoc(inChatUserRef, {
              sender: storedCredentials,
              ownerId: ownerId,
              msg: 'hello susan in chart ',
              status: 'unread',
              timeStamp: serverTimestamp()
          
         }) 
        if (!docSnap.exists()) {

        //  If chat does not exit
        await setDoc(chatsRef, {
          messages: [
            {
              sender: storedCredentials,
              msg: 'hello susan',
              adUrl: campaignImage,
              videoPreview: videoPreview,
              status: 'unread',
              timeSent:timeSent
            }
          ]
        })  
        }
        
      } else {
        
        await updateDoc(inChatUserRef, {
              msg: 'hello updated in chart',
              status: 'unread',
               timeStamp: serverTimestamp()
           }
        )
        
        await updateDoc(chatsRef, {
          messages: arrayUnion({
            sender:storedCredentials,
            msg: 'second chats',
            adUrl: campaignImage,
            videoPreview: videoPreview,
            status: 'read',
            timeSent:timeSent
          })
            
        });
      }

    } catch (error) {
      
    }
  }