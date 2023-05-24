import { Text, View, StatusBar, TouchableWithoutFeedback } from "react-native";

const TabPageLayout = (props) => {
  const {
    barStyle,
    statusColor,
    backgroundColor,
    children,
    back,
    title,
    mainBg,
  } = props;
  return (
    <>
      <View style={{ flex: 1, backgroundColor: mainBg }}>
        <StatusBar barStyle={barStyle} backgroundColor={statusColor} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingVertical: 6,
            backgroundColor: backgroundColor,
          }}
        >
          <Text
            style={{
              paddingTop: 0,
              flex: 1,
              textAlign: "left",
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 15 }}>{children}</View>
      </View>
    </>
  );
};
export default TabPageLayout;
