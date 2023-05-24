import * as React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Video } from "expo-av";

export const SmallPostCard = ({ adImg, views, previewPost, videoPreview }) => {
  const deviceWidth = Dimensions.get("window").width;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View
      style={{
        height: deviceWidth / 3 - 1,
        margin: 0.5,
        width: deviceWidth / 3 - 1,
        backgroundColor: Colors.offWhite,
        position: "relative",
      }}
    >
      {!videoPreview ? (
        <TouchableOpacity onPress={previewPost}>
          <Image
            source={{ uri: adImg || null }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={previewPost}
          style={{ flex: 1, position: "relative" }}
        >
          <View
            style={{
              paddingHorizontal: 1,
              borderRadius: 50 / 2,
              backgroundColor: "rgba(52, 52, 52, 0.8)",
              position: "absolute",
              zIndex: 20,
              right: 0,
            }}
          >
            <Ionicons name="play-circle-outline" size={24} color="white" />
          </View>
          <Video
            ref={video}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
            }}
            source={{
              uri: adImg || null,
            }}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={true}
            isMuted={true}
            shouldCorrectPitch={false}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </TouchableOpacity>
      )}

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: -5,
          opacity: 0.7,
          backgroundColor: Colors.black,
          paddingHorizontal: 8,
          marginHorizontal: 5,
        }}
      >
        <Ionicons
          name="ios-eye-outline"
          size={13}
          color="white"
          style={{ marginTop: 2 }}
        />
        <Text
          style={{
            color: Colors.white,
            marginLeft: 3,
            marginTop: 1,
            fontSize: 10,
            fontFamily: "Poppins_400Regular",
          }}
        >
          {views > 999 && views < 999999 ? views / 100 + "K" : views}
        </Text>
      </View>
    </View>
  );
};

// cropHeight = { Dimensions.get('window').height / 2 }
// cropWidth={Dimensions.get('window').width}
