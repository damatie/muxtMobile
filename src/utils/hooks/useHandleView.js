import { db } from "../../firebase";
import * as React from 'react'
import { useEffect, useState,useContext } from 'react';
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  collection,

} from 'firebase/firestore';
import { CredentialContext } from "../../store/CredentialContext";

// const storedCredentials  = 'VDzv7PeSabWPzVj2p3Hm2xzuLKE2'
  //  Handle views
export const handleView = (storedCredentials) => {
  return React.useRef((viewableItems) => {  
      let data = viewableItems.viewableItems[0]
      // console.log(data.item.views[0] && data.item.views[0].view)
      
      let newState = data.item.views && data.item.views.filter((view) =>view.viewerId===storedCredentials).map((obj) => {
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
  }
