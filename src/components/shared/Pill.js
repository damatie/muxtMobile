import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../utils/Colors";

export const Pill = (props) => {
  const { stylePill, id, name = "sample pill text" } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
        marginBottom: 5,
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
        ...stylePill,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: "gray",
          fontFamily: "Poppins_400Regular",
          textAlign: "center",
          userSelect: "none",
          fontStyle: "none",
        }}
      >
        {name}
      </Text>
    </View>
  );
};
