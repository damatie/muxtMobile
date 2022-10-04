import { StyleSheet, Text, View, Image,ScrollView,
} from 'react-native';

export const FeaturedCard = () => {
  return (
    <>
      <View style={{ marginBottom:10, paddingBottom:10, marginHorizontal:0, paddingHorizontal:10,  backgroundColor:'white',}}>
        <Text style={{
          fontSize: 13,
          marginBottom: 6,
          fontFamily: 'Poppins_600SemiBold',
        }}>
          Top Featured
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
      }}>
        
        <View style={{
          backgroundColor: '#E6EBED',
          height: 60,
          padding:3,
          width: 60,
          borderWidth: 1,
          borderColor:'white',
          marginRight:6,
          borderRadius: 20 / 2,
        
        }}>
          <Image
            source={require('../../../assets/ads-4.jpg')}
              style={{
                width:'100%',
                height: '100%',
                borderRadius: 15 / 2,
                resizeMode: "contain",
              }}
          />

          </View>
          <View style={{
          backgroundColor: '#E6EBED',
          height: 60,
          padding:3,
          width: 60,
          borderWidth: 1,
          borderColor:'white',
          marginRight:6,
          borderRadius: 20 / 2,
        
        }}>
          <Image
            source={require('../../../assets/ads-3.jpg')}
              style={{
                width:'100%',
                height: '100%',
                borderRadius: 15 / 2,
                resizeMode: "contain",
              }}
          />

          </View>
          <View style={{
          backgroundColor: '#E6EBED',
          height: 60,
          padding:3,
          width: 60,
          borderWidth: 1,
          borderColor:'white',
          marginRight:6,
          borderRadius: 20 / 2,
        
        }}>
          <Image
            source={require('../../../assets/ads-5.jpg')}
              style={{
                width:'100%',
                height: '100%',
                borderRadius: 15 / 2,
                resizeMode: "contain",
              }}
          />

          </View>
          <View style={{
          backgroundColor: '#E6EBED',
          height: 60,
          padding:3,
          width: 60,
          borderWidth: 1,
          borderColor:'white',
          marginRight:6,
          borderRadius: 20 / 2,
        
        }}>
          <Image
            source={require('../../../assets/ads-2.jpg')}
              style={{
                width:'100%',
                height: '100%',
                borderRadius: 15 / 2,
                resizeMode: "contain",
              }}
          />

          </View>
          <View style={{
          backgroundColor: '#E6EBED',
          height: 60,
          padding:3,
          width: 60,
          borderWidth: 1,
          borderColor:'white',
          marginRight:6,
          borderRadius: 20 / 2,
        
        }}>
          <Image
            source={require('../../../assets/ads.jpg')}
              style={{
                width:'100%',
                height: '100%',
                borderRadius: 15 / 2,
                resizeMode: "contain",
              }}
          />

          </View>
            <View style={{
          backgroundColor: '#E6EBED',
          height: 60,
          padding:3,
          width: 60,
          borderWidth: 1,
          borderColor:'white',
          marginRight:6,
          borderRadius: 20 / 2,
        
        }}>
          <Image
            source={require('../../../assets/ads-5.jpg')}
              style={{
                width:'100%',
                height: '100%',
                borderRadius: 15 / 2,
                resizeMode: "contain",
              }}
          />

        </View>
        </ScrollView>
      </View>
    </>
  )
}