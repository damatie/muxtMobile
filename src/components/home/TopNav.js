import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Searchbar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../../store/CredentialContext';
export const TopNav = () => {
  const{setStoredCredentials} = useContext(CredentialContext)

  // Handle Logout
  const handleLogout = () => {
    console.log('logout')
    persistLogin()
    AsyncStorage.removeItem('user');
  }

   // Persist Login
  const persistLogin = async () => {
    try {
      await  AsyncStorage.removeItem('user');
      setStoredCredentials(null)

    } catch (err){
      console.log(err)
      console.log(' filed logout')
    }
  }
  return (
    <>
       <View style={{
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical:10
      }}>
        <View style={{ flexDirection:'row',paddingBottom:5, }}>
            <TouchableOpacity onPress={handleLogout} style={{ height: 30, width: 30, borderRadius: 35 / 2, backgroundColor: '#eef', alignItems: 'flex-start' }}>
              <Image
                source={require('../../../assets/ads-5.jpg')}
                style={{
                width:'100%',
                height: '100%',
                borderRadius: 35/2,
                resizeMode: "contain",
              }}
               />
             
            </TouchableOpacity>
          <View style={{ flex: 1, alignItems:'flex-start',  alignItems:'center' }}>
            <Image
              source={require('../../../assets/logo-2.png')}
                style={{
                  width: 97,
                  height: 23,
                    resizeMode: "contain",
                }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent:'flex-end', }}>
            <View>
              <Ionicons name="ios-notifications-outline" size={22} color="white"
              style={{
                backgroundColor: '#4A154B',
                width: 30,
                height: 30,
                paddingTop: 3,
                textAlign:'center',
                borderRadius:30/2
              }} />
              <Text style={{ backgroundColor:'red', color:'white', height:8, width:8, fontSize:10, textAlign:'center', borderRadius:15/2, position:'absolute', right:5, top:3}}>
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={{
          marginTop: 5,
          flexDirection:'row'
        }}>
          <View style={{ flex:1, flexDirection:'column'}}>
              <Text style={{ color:'#000',  fontFamily:'Poppins_600SemiBold', fontSize: 12,}}>Hi, Maxwell</Text>
            <Text style={{ color: "#000", fontSize: 13, fontFamily: 'Poppins_700Bold', marginTop: -5 }}>
              Explore  Deals and Offers!
              </Text>
            </View>
          </View> */}
      </View>
    </>
  )
}