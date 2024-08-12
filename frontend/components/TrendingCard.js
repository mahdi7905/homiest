import { TouchableOpacity, ImageBackground } from "react-native";

import { useRouter } from "expo-router";
import React from "react";
import { styles } from "../constants/styles";

const TrendingCard = ({ item }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.trendingContainer}
      onPress={() => router.push(`(home)/${item._id}`)}
    >
      <ImageBackground
        source={{ uri: item.avatar }}
        style={[styles.trendingCard]}
        resizeMode="cover"
      ></ImageBackground>
    </TouchableOpacity>
  );
};

export default TrendingCard;
