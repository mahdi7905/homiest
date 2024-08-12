import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { styles } from "../constants/styles";

const BookingCard = ({ booking }) => {
  const date = new Date(booking.schedule);
  return (
    <Pressable
      style={{
        backgroundColor: colors["card-secondary"],
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <Image
        source={{ uri: booking.service?.avatar }}
        resizeMode="cover"
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />
      <View style={{ gap: 5 }}>
        <Text
          style={{
            fontFamily: "interSemiBold",
            fontSize: 20,
            color: colors["font-name"],
          }}
        >
          {booking.service.firstName} {booking.service.surName}
        </Text>
        <Text
          style={{
            fontFamily: "interSemiBold",
            fontSize: 18,
            color: colors["font-profession"],
          }}
        >
          {booking.service.profession}
        </Text>
        <Text style={styles.label}>
          Cost: <Text style={styles.content}>N {booking.charge}</Text>
        </Text>
        <Text style={styles.label}>
          Date:{" "}
          <Text style={styles.content}>
            {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
          </Text>
        </Text>
        <Text style={styles.label}>
          Time:{" "}
          <Text style={styles.content}>
            {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:
            {date.getMinutes() >= 10
              ? date.getMinutes()
              : `0${date.getMinutes()}`}{" "}
            {date.getHours() < 12 ? "AM" : "PM"}
          </Text>
        </Text>
        <Text style={styles.label}>
          Duration: <Text style={styles.content}>{booking.duration} hours</Text>
        </Text>
        <Text style={styles.label}>
          Location: <Text style={styles.content}>{booking.address.city}</Text>
        </Text>
      </View>
    </Pressable>
  );
};

export default BookingCard;
