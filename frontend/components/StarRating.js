import { View } from "react-native";
import { colors } from "../constants/colors";

import { FontAwesome } from "@expo/vector-icons";
import React from "react";

const Star = ({ num, rate }) => {
  const half = num - 0.5;

  return rate >= num ? (
    <FontAwesome name="star" size={15} color={colors["rating-color"]} />
  ) : rate >= half ? (
    <FontAwesome
      name="star-half-empty"
      size={15}
      color={colors["rating-color"]}
    />
  ) : (
    <FontAwesome name="star-o" size={15} color={colors["rating-color"]} />
  );
};

const StarRating = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      {stars.map((star) => (
        <Star rate={rating} num={star} key={star} />
      ))}
    </View>
  );
};

export default StarRating;
