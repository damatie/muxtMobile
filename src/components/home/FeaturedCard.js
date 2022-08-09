import { StyleSheet, Text, View, Image,ScrollView,
} from 'react-native';

export const FeaturedCard = () => {
  return (
    <>
      <View style={{ marginVertical:10, marginHorizontal:20}}>
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
          height: 100,
          padding:3,
          width: 100,
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
        </ScrollView>
      </View>
    </>
  )
}