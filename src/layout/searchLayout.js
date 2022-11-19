import {
 Text, View, StatusBar, TouchableWithoutFeedback,KeyboardAvoidingView
} from 'react-native';
import { Searchbar, } from 'react-native-paper';
import { Colors } from '../utils/Colors';
 
const SearchLayout = (props) => {
  const {barStyle,statusColor,backgroundColor,children,back, title,mainBg, onChangeSearch, searchQuery } = props
  return (
    <>
       <View style={{flex:1, backgroundColor:mainBg}} >
        <StatusBar barStyle={barStyle} backgroundColor={statusColor} />
        <View style={{ flexDirection: 'column', paddingHorizontal: 15, paddingVertical:6, backgroundColor: backgroundColor }}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ height: 40, borderRadius: 50 }}
            inputStyle={{ fontSize:12}}
          />
        </View>
        {children}
    </View>
    </>
  )
}
export default SearchLayout