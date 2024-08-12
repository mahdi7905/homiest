import { View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "../../../constants/styles";
import BookingCard from "../../../components/BookingCard";
import { BookingContext } from "../../../context/bookingContext";

const Bookings = () => {
  const { bookings } = useContext(BookingContext);
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 20 }}
      >
        {bookings.length === 0 && (
          <Text
            style={{
              fontFamily: "interBold",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            You have no bookings
          </Text>
        )}
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
      </ScrollView>
    </View>
  );
};

export default Bookings;
