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
import {db,auth} from '../../src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FeaturedCard } from '../components/home/FeaturedCard';
import { AdCard } from '../components/home/AdCard';
import { TopNav } from '../components/home/TopNav';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.ads);
  const [ads, setAds] = useState([])
  const deviceWidth = Dimensions.get('window').width;

  // Get Ads
    const getCampaigns = async () => {
    const data = [];
    const querySnapshot = await getDocs(collection(db, "campaigns"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
       return data.push({id:doc.id, ...doc.data()})
    });
    setAds(data)
  }
  // Handle Like
  const handleLike = (value) => {
    console.log(`Liked${value}`)
  }
  //  console.log(items)
  useEffect(() => {
    getCampaigns();
  }, [])

  // console.log(ads)

  // Rendered Ad Component
  const renderAds = ({item}) => {
    return (
      <AdCard
      handleLike={()=>handleLike(item.id)}
      merchantName={item.businessName}
      time={item?.timeStamp?.seconds}
      merchantImg={`${item.userImg}`}
      campaignTitle={item.campaignTitle}
      campaignImg={`${item?.campaignImage}`}
      content={item.campaignDescription}
      likes={item.campaignLikes}
      shares={item.campaignShare}
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
              showsVerticalScrollIndicator={false}
              data={ads}
              renderItem={renderAds}
              contentContainerStyle={{alignItems: "stretch", width:deviceWidth,paddingBottom:5,
             }}
              keyExtractor={item => item.id}
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
