import { View, TouchableWithoutFeedback } from "react-native"
import { Ionicons } from '@expo/vector-icons';


export const BackNav = (props) => {
   const { onPress} = props
  return (
    <View style={{backgroundColor:'#4A154B'}}>
      <TouchableWithoutFeedback  onPress={onPress} >
          <Ionicons name="ios-arrow-back-circle-outline" size={30} color="#fff" style={{ marginLeft:15}} />
        </TouchableWithoutFeedback>
    </View>
  )
}