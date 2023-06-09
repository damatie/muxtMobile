import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { Colors } from "../../utils/Colors";
import TabPageLayout from "../../layout/tabPageLayout";
import { WalletCard } from "../../components/wallet/walletCard";
import { SmallerCard } from "../../components/wallet/smallerCard";

export const Wallet = () => {
  return (
    <TabPageLayout
      barStyle={"dark-content"}
      statusColor={Colors.white}
      backgroundColor={Colors.white}
      title={"Wallet"}
      mainBg={Colors.offWhite}
    >
      {/* <View style={styles.container}>
        <WalletCard />
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            backgroundColor: "red",
            justifyContent: "center",
          }}
        >
          <SmallerCard
            text={"Withdraw"}
            icon={"dollar"}
            color={Colors.secondary}
          />
          <SmallerCard
            text={"Transaction"}
            icon={"bank"}
            color={Colors.primaryLight}
          />
          <SmallerCard
            text={"Settings"}
            icon={"gear"}
            color={Colors.primaryLight}
          />
        </View>
      </View> */}
    </TabPageLayout>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    flexDirection: "column",
  },
  titleHeader: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  titleHeaderLight: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: Colors.gray,
  },
});
