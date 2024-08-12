import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../constants/styles";
import Btn from "./Btn";
import StarRating from "./StarRating";
import { useRouter } from "expo-router";
import { colors } from "../constants/colors";

const ServiceCard = ({ item }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`(home)/${item._id}`)}>
      <View style={styles.serviceCard}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: item.avatar }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                borderColor: colors["secondary-bg"],
                borderWidth: 2,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={styles.textName}>
                {item.firstName} {item.surName}
              </Text>
              <Text style={styles.textPrice}>{`N ${item.charge} / h`}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={styles.textProfession}>{item.profession}</Text>
              <Text style={styles.textLocation}>{item.location}</Text>
            </View>
            <StarRating rating={item.rating} />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "flex-end",
              }}
            >
              <Btn
                size="big"
                variant="contained"
                title="Book Now"
                round={true}
                route={`CreateBooking?service_id=${item._id}`}
              />
              <Btn
                size="big"
                variant="outlined"
                title="Message"
                round={true}
                route="Messages"
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;
