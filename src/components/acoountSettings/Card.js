import React from "react";
import { View, Text, Image } from "react-native";
import { Colors } from "../../utils/Colors";

export const Card = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: Colors.white,
        padding: 10,
        height: 200,
        borderRadius: 10,
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
      }}
    ></View>
  );
};
