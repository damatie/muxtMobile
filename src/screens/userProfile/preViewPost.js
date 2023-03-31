import { View, Text, Dimensions, Image, FlatList } from "react-native"
import { Colors } from "../../utils/Colors"
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { CredentialContext } from "../../store/CredentialContext";
import { AdCard } from "../../components/home/AdCard";
import GeneralLayout from "../../layout/generalLayout"

export const PreViewPost = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const deviceWidth = Dimensions.get('window').width;
  const { ads } = useSelector((state) => state.ads);
  const{storedCredentials} = useContext(CredentialContext)

  // Route params
  const { name, id, userImg } = route.params;
  console.log(route)
  // console.log(post)

  // Card 
  const Card = ({adImg,}) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          marginBottom:1,
          
        }}>
        <View style={{
          width: '100%',
          height: 300,
          backgroundColor:Colors.gray
        }}>
          <Image
            source={{uri:adImg}}
            style={{
            width:'100%',
            height: '100%',
            resizeMode: "contain",
          }}
          />
        </View>
        
    </View>)
  }
  const renderPosts = ({ item, index }) => {
     let clildLike;
    clildLike = item.likes.filter((obj) => obj.campaignId === item.id && obj.likerId === storedCredentials).map((element) => {
      return(element)
    })

    const likeCount = item.likes.filter((obj, objIndex) => obj.liked === true)
    return (
      <Text>
        {name}{id}
     </Text>
    )
  }
  useEffect(() => {
  },[])
  return (
    <GeneralLayout
      back={() => navigation.goBack()}
      barStyle={'dark-content'}
      statusColor={Colors.white}
      backgroundColor={Colors.white}
      title={name}
      mainBg={Colors.white}
    >
      <FlatList
          data={ads.filter(obj => obj.userId === id)}
          style={{ margin:0, marginTop:4}}
          keyExtractor={
            (item, index)=> index.toString()
          }
          renderItem={renderPosts}
        />
    </GeneralLayout>
  )
}