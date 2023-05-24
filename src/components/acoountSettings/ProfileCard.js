import React from "react";
import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

export const ProfileCard = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.white,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          height: 70,
          width: 70,
          backgroundColor: Colors.whiteGray,
          borderRadius: 100,
        }}
      ></View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 250,
          width: "100%",

          marginLeft: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingTop: 5,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                color: Colors.black,
              }}
            >
              200
            </Text>
            <Text
              style={{
                color: Colors.gray,
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Viewed
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                color: Colors.black,
              }}
            >
              40
            </Text>
            <Text
              style={{
                color: Colors.gray,
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Shared
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                color: Colors.black,
              }}
            >
              1k
            </Text>
            <Text
              style={{
                color: Colors.gray,
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Liked
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Feather name="edit" size={24} color={Colors.primary} />
          </View>
        </View>
      </View>
    </View>
  );
};
