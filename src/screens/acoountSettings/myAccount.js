import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import GeneralLayout from "../../layout/generalLayout";
import { Colors } from "../../utils/Colors";
import { ProfileCard } from "../../components/acoountSettings/ProfileCard";
import { Pill } from "../../components/shared/Pill";

export const MyAccount = ({ navigation, route }) => {
  return (
    <GeneralLayout
      back={() => navigation.goBack()}
      barStyle={"dark-content"}
      statusColor={Colors.white}
      backgroundColor={Colors.white}
      title={"Edafe maxwell"}
      mainBg={Colors.offWhite}
    >
      <View
        style={{
          flexDirection: "column",
          paddingTop: 0,
          paddingHorizontal: 20,
          backgroundColor: Colors.white,
        }}
      >
        <ProfileCard />
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Poppins_600SemiBold",
            textTransform: "uppercase",
          }}
        >
          interests
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 15,
            width: "100%",
          }}
        >
          <Pill name="Fashion" stylePill={{ marginRight: 6 }} />
          <Pill name="Football" stylePill={{ marginRight: 6 }} />
          <Pill name="Cars" stylePill={{ marginRight: 6 }} />
          <Pill name="Shopping" stylePill={{ marginRight: 6 }} />
          <Pill name="Fashion" stylePill={{ marginRight: 6 }} />
          <Pill name="Football" stylePill={{ marginRight: 6 }} />
          <Pill name="Cars" stylePill={{ marginRight: 6 }} />
          <Pill name="Shopping" stylePill={{ marginRight: 6 }} />
          <Pill name="Fashion" stylePill={{ marginRight: 6 }} />
          <Pill name="Football" stylePill={{ marginRight: 6 }} />
          <Pill name="Cars" stylePill={{ marginRight: 6 }} />
          <Pill name="Shopping" stylePill={{ marginRight: 6 }} />
          <Pill name="Fashion" stylePill={{ marginRight: 6 }} />
          <Pill name="Football" stylePill={{ marginRight: 6 }} />
          <Pill name="Cars" stylePill={{ marginRight: 6 }} />
          <Pill name="Shopping" stylePill={{ marginRight: 6 }} />
        </View>
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Poppins_600SemiBold",
            textTransform: "uppercase",
            color: Colors.black,
          }}
        >
          possible locations
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 15,
            width: "100%",
          }}
        >
          <Pill name="Lekki" stylePill={{ marginRight: 6 }} />
          <Pill name="Ikorodu" stylePill={{ marginRight: 6 }} />
          <Pill name="Ajah" stylePill={{ marginRight: 6 }} />
          <Pill name="Isolo" stylePill={{ marginRight: 6 }} />
          <Pill name="Ketu" stylePill={{ marginRight: 6 }} />
          <Pill name="Epe" stylePill={{ marginRight: 6 }} />
          <Pill name="Ilaje" stylePill={{ marginRight: 6 }} />
          <Pill name="Lekki" stylePill={{ marginRight: 6 }} />
          <Pill name="Ikorodu" stylePill={{ marginRight: 6 }} />
          <Pill name="Ajah" stylePill={{ marginRight: 6 }} />
          <Pill name="Isolo" stylePill={{ marginRight: 6 }} />
          <Pill name="Ketu" stylePill={{ marginRight: 6 }} />
          <Pill name="Epe" stylePill={{ marginRight: 6 }} />
          <Pill name="Ilaje" stylePill={{ marginRight: 6 }} />
        </View>
      </View>
    </GeneralLayout>
  );
};
