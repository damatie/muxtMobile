import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image,ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black
} from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });
  if (!fontsLoaded) {
    return <Text> Loading</Text>
  } else {
    return (
    <>
      <SafeAreaView style={styles.container}>
          <View style={{
            backgroundColor: '#fff',
            padding: 15,
          }}>
          <View style={{ flexDirection:'row',paddingBottom:10, }}>
            <View style={{ flex: 1, alignItems:'flex-start', }}>
              <Image
                source={require('./assets/logo.png')}
                  style={{
                    width: 97,
                    height: 23,
                     resizeMode: "contain",
                  }}
              />
              {/* <Text style={{ color: "#fff", fontSize:30,  }}>Muxt..</Text> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent:'flex-end', }}>
                <Ionicons name="ios-notifications-outline" size={24} color="black" />
                <Text style={{ backgroundColor:'red', color:'white', height:15, width:15, fontSize:10, textAlign:'center', borderRadius:15/2, position:'absolute'}}>
                    4
                </Text>
            </View>
          </View>
          <View style={{ marginTop: 20, }}>
            <Text style={{ color:'#000',  fontFamily:'Poppins_600SemiBold'}}>Hi, Maxwell</Text>
            <Text style={{ color: "#000",  fontSize:16, fontFamily:'Poppins_700Bold', marginTop:-5}}>Exlpore  Deals and Offers!</Text>
          </View>
          {/*Sponsored Ads End */}
          </View>
          <ScrollView>
            <View style={{ flex: 1}}>
          
          <View style={{ flex: 1, backgroundColor:'#F8F8FA', flexDirection: 'column', padding:10,  }}>
            {/* Ads card */}
            <View style={{ backgroundColor: '#fff', height: 500, paddingBottom:10, marginBottom:10, borderRadius:30/2}}>
              <View style={{ flexDirection: 'row', padding: 10, position:'relative' }}>
                <View style={{ flex:1, flexDirection: 'row', backgroundColor:'white' }}>
                  <View style={{ height:40, width:40, borderRadius:40/2, backgroundColor:'#eef', marginRight:10, alignItems:'flex-start'}}>

                  </View>
                  <View style={{ marginTop:3}}>
                    <Text style={{ fontWeight:'900', fontFamily:'Poppins_600SemiBold'}}>
                     Edafe maxwell
                    </Text>
                    <Text style={{ fontSize:10, fontFamily:'Poppins_400Regular'}}>
                     14 min ago
                    </Text>
                  </View>
                  </View>
                  <View style={{ textAlign:'right',  position:'absolute', right:0, top:17}}>
                    <MaterialIcons name="more-vert" size={25} color="black" />
                  </View>
                
              </View>

                <View style={{
                  flex: 1,
                  maxHeight:400,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                }}>
                   <Image
                    source={require('./assets/ads.jpg')}
                    style={{
                      width: '100%',
                      height:'100%',
                      flex: 1,
                      resizeMode: "contain",
                    }}
              />
              </View>

              {/* Card Footer */}
            
              <View style={{ backgroundColor: '#fff', padding: 10, position:'relative',  }}>
                <Text style={{ fontSize:11, fontFamily:'Poppins_600SemiBold', paddingBottom:2}}>
                 #Tech openings
                </Text>
                <Text style={{ fontSize:11, fontFamily:'Poppins_400Regular', paddingBottom:20}}>
                 Women in Tech Event at VanHack works, who can register & what to expect  ..
                </Text>
                   <View style={{flexDirection:"row", position:'absolute', bottom:0, right:0, left:0, paddingLeft:10, paddingRight:10,}}>
                      <View style={{ flex:1, }}>
                        <View style={{ flexDirection: 'row', }}>
                          <MaterialIcons name="favorite-border" size={24} color="black" />
                          <Text style={{  fontFamily:'Poppins_400Regular', fontSize: 12, marginRight: 10, marginLeft:5,paddingTop:5 }}>Likes 23,859 </Text>
                        <Ionicons name="md-share-outline" size={24} color="black" />
                          <Text style={{ fontFamily:'Poppins_400Regular',  fontSize:12,marginLeft:5, paddingTop:5 }}>Shared 300,425 </Text>
                      </View>
                    </View>
                      <View>
                        <Fontisto name="favorite" size={24} color="black" />
                    </View>
                </View>
              </View>
                </View>
                <View style={{ backgroundColor: '#fff', height: 500, paddingBottom:10, marginBottom:10, borderRadius:30/2}}>
              <View style={{ flexDirection: 'row', padding: 10, position:'relative' }}>
                <View style={{ flex:1, flexDirection: 'row', backgroundColor:'white' }}>
                  <View style={{ height:40, width:40, borderRadius:40/2, backgroundColor:'#eef', marginRight:10, alignItems:'flex-start'}}>

                  </View>
                  <View style={{ marginTop:3}}>
                    <Text style={{ fontWeight:'900', fontFamily:'Poppins_600SemiBold'}}>
                     Nike Official
                    </Text>
                    <Text style={{ fontSize:10, fontFamily:'Poppins_400Regular'}}>
                     30 min ago
                    </Text>
                  </View>
                  </View>
                  <View style={{ textAlign:'right',  position:'absolute', right:0, top:17}}>
                    <MaterialIcons name="more-vert" size={25} color="black" />
                  </View>
                
              </View>

                <View style={{
                  flex: 1,
                  maxHeight:400,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                }}>
                   <Image
                    source={require('./assets/ads-5.jpg')}
                    style={{
                      width: '100%',
                      height:'100%',
                      flex: 1,
                      resizeMode: "contain",
                    }}
              />
              </View>

              {/* Card Footer */}
            
              <View style={{ backgroundColor: '#fff', padding: 10, position:'relative',  }}>
                <Text style={{ fontSize:11, fontFamily:'Poppins_600SemiBold', paddingBottom:2}}>
                 #New Lunch
                </Text>
                <Text style={{ fontSize:11, fontFamily:'Poppins_400Regular', paddingBottom:20}}>
                 Cool shoes from nike, keep running  ..
                </Text>
                   <View style={{flexDirection:"row", position:'absolute', bottom:0, right:0, left:0, paddingLeft:10, paddingRight:10,}}>
                      <View style={{ flex:1, }}>
                        <View style={{ flexDirection: 'row', }}>
                          <MaterialIcons name="favorite-border" size={24} color="black" />
                          <Text style={{  fontFamily:'Poppins_400Regular', fontSize: 12, marginRight: 10, marginLeft:5,paddingTop:5 }}>Likes 23,859 </Text>
                        <Ionicons name="md-share-outline" size={24} color="black" />
                          <Text style={{ fontFamily:'Poppins_400Regular',  fontSize:12,marginLeft:5, paddingTop:5 }}>Shared 300,425 </Text>
                      </View>
                    </View>
                      <View>
                        <Fontisto name="favorite" size={24} color="black" />
                    </View>
                </View>
              </View>
                </View>
                <View style={{ backgroundColor: '#fff', height: 500, paddingBottom:10, marginBottom:10, borderRadius:30/2}}>
              <View style={{ flexDirection: 'row', padding: 10, position:'relative' }}>
                <View style={{ flex:1, flexDirection: 'row', backgroundColor:'white' }}>
                  <View style={{ height:40, width:40, borderRadius:40/2, backgroundColor:'#eef', marginRight:10, alignItems:'flex-start'}}>

                  </View>
                  <View style={{ marginTop:3}}>
                    <Text style={{ fontWeight:'900', fontFamily:'Poppins_600SemiBold'}}>
                     The Place Resturant
                    </Text>
                    <Text style={{ fontSize:10, fontFamily:'Poppins_400Regular'}}>
                     50 min ago
                    </Text>
                  </View>
                  </View>
                  <View style={{ textAlign:'right',  position:'absolute', right:0, top:17}}>
                    <MaterialIcons name="more-vert" size={25} color="black" />
                  </View>
                
              </View>

                <View style={{
                  flex: 1,
                  maxHeight:400,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                }}>
                   <Image
                    source={require('./assets/ads-7.jpg')}
                    style={{
                      width: '100%',
                      height:'100%',
                      flex: 1,
                      resizeMode: "contain",
                    }}
              />
              </View>

              {/* Card Footer */}
            
              <View style={{ backgroundColor: '#fff', padding: 10, position:'relative',  }}>
                <Text style={{ fontSize:11, fontFamily:'Poppins_600SemiBold', paddingBottom:2}}>
                 #Tech openings
                </Text>
                <Text style={{ fontSize:11, fontFamily:'Poppins_400Regular', paddingBottom:20}}>
                 Women in Tech Event at VanHack works, who can register & what to expect  ..
                </Text>
                   <View style={{flexDirection:"row", position:'absolute', bottom:0, right:0, left:0, paddingLeft:10, paddingRight:10,}}>
                      <View style={{ flex:1, }}>
                        <View style={{ flexDirection: 'row', }}>
                          <MaterialIcons name="favorite-border" size={24} color="black" />
                          <Text style={{  fontFamily:'Poppins_400Regular', fontSize: 12, marginRight: 10, marginLeft:5,paddingTop:5 }}>Likes 23,859 </Text>
                        <Ionicons name="md-share-outline" size={24} color="black" />
                          <Text style={{ fontFamily:'Poppins_400Regular',  fontSize:12,marginLeft:5, paddingTop:5 }}>Shared 300,425 </Text>
                      </View>
                    </View>
                      <View>
                        <Fontisto name="favorite" size={24} color="black" />
                    </View>
                </View>
              </View>
            </View>
          </View>
            </View>
          </ScrollView>
       
      </SafeAreaView>
      
    </>
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight
  },


});
