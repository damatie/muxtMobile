import { View, Text,StyleSheet } from "react-native"
import { Colors } from "../../utils/Colors"

export const WalletCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleHeader}> TOTAL BALANCE
      </Text>
      <Text style={styles.textMd}>
        $ 50.00
      </Text>
      <Text style={styles.textSm}>
        100 MXT Coins
      </Text>

    </View>
  )
}

 // Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 120, width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    elevation: 2,
    shadowColor: Colors.black,
    shadowRadius: 30
  },
  titleHeader: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold'
  },
  textMd: {
    marginTop: 10,
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom:- 8
  },
  textSm: {
    color: Colors.whiteGray,
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold'
  },
});