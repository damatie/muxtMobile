import {
  StyleSheet,
  Text,
  View,
  creator,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from "react-native-modal";
import { Colors } from '../../utils/Colors';

export const PostPreviewModal = ({
  toggleModal,
  isModalVisible,
  zoomItem,
  setZoomItem,
  campaignInfo,
}) => {

  return (
       <Modal
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        backdropOpacity={1}
        backdropColor='black'
        onModalHide={()=>setZoomItem([])}
        coverScreen={true}
        useNativeDriver={true}
        onBackButtonPress={toggleModal}
        style={{ position:'relative', margin:0, marginVertical:Platform.OS === 'ios' ? 40  : 0, paddingTop:0}}
    >
      <View
        style={{ flexDirection:'column', height:50, backgroundColor:'black'}}
      >
            <View style={{ position:'absolute', top:10,left:10, zIndex:1}}>
            <Text style={{ color: Colors.white, fontFamily: 'Poppins_600SemiBold', fontSize: 18, textTransform:'capitalize' }}>{campaignInfo?.users[0]?.businessData?.businessName}</Text>
            </View>
            <View style={{ position:'absolute', top:6,right:10, zIndex:1}}>
                <TouchableNativeFeedback onPress={toggleModal}>
                  <Ionicons name="close-outline" size={34} color="white" style={{paddingHorizontal:2.5, paddingTop:0, backgroundColor:Colors.black, textAlign:'center', borderWidth:2,}} />
              </TouchableNativeFeedback>
            </View>
          </View>
          <ImageViewer
            imageUrls={zoomItem&&zoomItem}
            renderIndicator={() => null}  style={{ flex:1}} />
          <View style={{ color: 'white', flex: 1, zIndex: 1, position: 'absolute', bottom: 0, backgroundColor: 'rgba(52, 52, 52, 0.8)', flexDirection: 'column', width: '100%', padding:10,  }}>
        <Text style={{ color: Colors.white, fontFamily: 'Poppins_600SemiBold', fontSize: 11,textTransform:'capitalize' }}>{campaignInfo?.campaignTitle}</Text>
            <Text style={{ color: Colors.white, fontFamily: 'Poppins_400Regular', fontSize: 11, paddingVertical: 2 }}>
             {campaignInfo?.campaignDescription}
            </Text>
            <View style={{ flexDirection:'row', width:'100%', justifyContent:'space-between', borderTopWidth:1, borderTopColor:Colors.black, paddingTop:8, marginTop:5}}>
              <Text style={{ color: Colors.white, fontFamily: 'Poppins_400Regular', fontSize: 11, paddingVertical: 2 }}>
            Likes: {campaignInfo?.campaignLikes}</Text>
              <Text style={{ color: Colors.white, fontFamily: 'Poppins_400Regular', fontSize: 11, paddingVertical: 2 }}>
            Shares: {campaignInfo?.campaignShare}</Text>
              <Text style={{ color: Colors.white, fontFamily: 'Poppins_400Regular', fontSize: 11, paddingVertical: 2 }}>
            Views: {campaignInfo?.campaignViews}</Text>
            </View>
          </View>
         
    </Modal>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'red'
  },


});