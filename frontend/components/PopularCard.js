import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { styles } from "../constants/styles";
import { colors } from "../constants/colors";
import Btn from "./Btn";
import StarRating from "./StarRating";

const PopularCard = ({ item }) => {
  const { rating, _id } = item;
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`(home)/${item._id}`)}>
      <View style={styles.popularCard}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode="cover"
          style={styles.popularPic}
        />
        <View style={{ padding: 10 }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "interSemiBold",
              fontSize: 14,
              marginBottom: 5,
              color: colors["font-name"],
            }}
          >
            {item.firstName} {item.surName}
          </Text>
          <Text
            style={{
              fontFamily: "interSemiBold",
              fontSize: 14,
              marginBottom: 5,
              color: colors["font-profession"],
            }}
          >
            {item.profession}
          </Text>
          <StarRating rating={rating} />
          <Text
            style={{
              fontFamily: "interRegular",
              fontSize: 12,
              marginBottom: 5,
              marginTop: 5,
              color: colors["font-location"],
            }}
          >
            {item.location}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Btn
              size="regular"
              variant="contained"
              title="Book Now"
              route={`CreateBooking?service_id=${_id}`}
            />
            <Btn
              size="regular"
              variant="outlined"
              title="Message"
              round={false}
              route="Messages"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PopularCard;
