import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { Colors } from '../../utils/Colors';
import { useState } from 'react';
import { Button, Searchbar } from 'react-native-paper';
import SearchLayout from '../../layout/searchLayout';
import { SearchCard } from '../../components/search/searchCard';


export const Search = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);


  return (
    <SearchLayout
       statusColor={Colors.white}
      backgroundColor={Colors.white}
      mainBg={Colors.white}
      onChangeSearch={onChangeSearch}
      searchQuery={searchQuery}
    >
      <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
          <Text style={styles.titleHeader}>
            Search Found  
          </Text>
          <Text style={styles.titleHeaderLight}>
            246
          </Text>
        </View>
        <SearchCard
          viewProfile={() => navigation.navigate('UserProfile', {
          screen: 'Profile',
          params: {
            name: 'Nike',
            id: 'kmSJ7gWebIab3YJfXnQnvhAgJ5k1',
            userImg:'https://firebasestorage.googleapis.com/v0/b/movads-86100.appspot.com/o/images%2Fweb-183282388.jpg?alt=media&token=00848611-b219-46f5-8be5-fcf5f7ae01f6'
          },
          }
          )}
        />
        <View style={{ flexDirection:'column', width:'100%',alignItems:'center', marginTop:20}}>
          <TouchableOpacity>
            <Text style={{color:Colors.white, fontSize:14, backgroundColor:Colors.primaryLight, paddingVertical:8, paddingHorizontal:15, borderRadius:50}}>
              Load more
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     
      
    </SearchLayout>
  )
}

 // Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop:8,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  titleHeader: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  titleHeaderLight: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color:Colors.gray

  }
});