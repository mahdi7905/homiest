import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { styles } from "../constants/styles";
import { colors } from "../constants/colors";

const PackageCard = ({ item }) => {
  const router = useRouter();
  return (
    <View style={styles.packageCard}>
      <Text style={styles.coins}>{item.coins} Coins</Text>
      <Text style={styles.price}>
        For <Text style={styles.span}>N {item.price}</Text>
      </Text>
      <Pressable
        style={styles.purchase}
        onPress={() => router.push(`/PackagePayment?package_id=${item._id}`)}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors["card-bio"],
            fontFamily: "interSemiBold",
          }}
        >
          Purchase
        </Text>
      </Pressable>
    </View>
  );
};

export default PackageCard;
