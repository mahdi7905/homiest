import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { styles } from "../../../../constants/styles";
import { ServiceContext } from "../../../../context/serviceContext";
import { colors } from "../../../../constants/colors";
import { AuthContext } from "../../../../context/authContext";
import { BookingContext } from "../../../../context/bookingContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const CreateBooking = () => {
  const router = useRouter();
  const { dispatch } = useContext(BookingContext);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [period, setPeriod] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const { service_id } = useLocalSearchParams();
  const { serviceMen } = useContext(ServiceContext);
  const { user, dispatch: userDispatch } = useContext(AuthContext);
  const service = serviceMen.filter((item) => item._id === service_id)[0];
  const [booking, setBooking] = useState({
    service: `${service._id}`,
    user: `${user._id}`,
    phone: "",
    address: {
      city: "",
      block: "",
    },
    schedule: "",
    duration: 0,
    charge: 0,
  });
  const displayDate = new Date(date);
  const displayTime = new Date(time);
  const formattedDate = (date, period) => {
    const dt = new Date(date);
    const t = new Date(period);
    const x = new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds()
    );
    setBooking({ ...booking, schedule: x });
    console.log(x);
  };
  const handlePress = () => {
    // formattedDate(date, period);

    console.log("schedule", booking.schedule);
  };
  const handlePaymentProceed = async () => {
    try {
      const { data } = await axios.post(
        "http://172.20.10.4:4000/api/create-booking",
        booking
      );
      dispatch({ type: "CREATE_BOOKING", payload: data });
      router.push(`/checkout?booking_id=${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCoinPayment = async () => {
    if (user.wallet.balance >= booking.charge) {
      try {
        const { data } = await axios.post(
          "http://172.20.10.4:4000/api/create-booking",
          booking
        );
        if (data) {
          const { data: item } = await axios.post(
            "http://172.20.10.4:4000/api/checkout-with-coins",
            { _id: data._id }
          );
          if (item.success) {
            dispatch({ type: "CREATE_BOOKING", payload: item.booking });
            userDispatch({ type: "HOMIE_COIN", payload: item.wallet });
            Alert.alert("Payment Successiful!");
            router.back();
          }
        } else {
          Alert.alert("Payment was not successiful");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(`Insufficient coins ${user.wallet.balance}`);
    }
  };
  const handlePayLater = async () => {
    try {
      const { data } = await axios.post(
        "http://172.20.10.4:4000/api/create-booking",
        booking
      );
      dispatch({ type: "CREATE_BOOKING", payload: data });
      Alert.alert(
        "Booking has been created. You can go to bookings and proceed to payments"
      );
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.bookingPage}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
          style={styles.bookingCard}
        >
          <View style={styles.bookingDetails}>
            <Image
              source={{ uri: service.avatar }}
              resizeMode="cover"
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                borderColor: colors["secondary-bg"],
                borderWidth: 2,
              }}
            />
            <View style={styles.bookingCol}>
              <View style={[styles.bookingRow, { marginTop: 10 }]}>
                <Text
                  style={{
                    fontFamily: "interBold",
                    color: colors["font-name"],
                    fontSize: 16,
                  }}
                >
                  {service.firstName} {service.surName}
                </Text>
                <Text
                  style={{
                    fontFamily: "interSemiBold",
                    color: colors["font-charge"],
                    fontSize: 12,
                  }}
                >
                  N {booking.charge}
                </Text>
              </View>
              <View style={styles.bookingRow}>
                <Text
                  style={{
                    fontFamily: "interSemiBold",
                    color: colors["font-profession"],
                    fontSize: 14,
                  }}
                >
                  {service.profession}
                </Text>
                <Text
                  style={{
                    fontFamily: "interMedium",
                    color: colors["font-location"],
                    fontSize: 12,
                  }}
                >
                  {service.location}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bookingForm}>
            <View style={styles.bookingFormRow}>
              <TextInput
                placeholderTextColor={colors["secondary-bg"]}
                onChangeText={(val) => setBooking({ ...booking, phone: val })}
                value={booking.phone}
                inputMode="numeric"
                keyboardType="numeric"
                placeholder="Phone"
                style={styles.formInput}
              />
              <TextInput
                placeholderTextColor={colors["secondary-bg"]}
                onChangeText={(val) =>
                  setBooking({
                    ...booking,
                    address: { ...booking.address, city: val },
                  })
                }
                value={booking.address.city}
                placeholder="State"
                style={styles.formInput}
              />
            </View>
            <View style={styles.bookingFormRow}>
              <TextInput
                placeholderTextColor={colors["secondary-bg"]}
                onChangeText={(val) =>
                  setBooking({
                    ...booking,
                    duration: val,
                    charge: val * service.charge,
                  })
                }
                value={booking.duration}
                inputMode="numeric"
                keyboardType="numeric"
                placeholder="Duration in hours"
                style={styles.formInput}
              />
            </View>
            <View style={styles.bookingFormRow}>
              {showTime ? (
                <DateTimePicker
                  mode="time"
                  is24Hour={true}
                  value={time}
                  onChange={(event, selectedDate) => {
                    setTime(selectedDate);
                    setPeriod(selectedDate);
                    setShowTime(false);
                  }}
                />
              ) : (
                <Pressable
                  onPress={() => setShowTime(true)}
                  style={styles.formInputDate}
                >
                  <Text
                    style={{
                      fontFamily: "interMedium",
                      color: colors["secondary-bg"],
                      fontSize: 12,
                    }}
                  >
                    {displayTime.getHours() > 12
                      ? displayTime.getHours() - 12
                      : displayTime.getHours()}
                    :
                    {displayTime.getMinutes() >= 10
                      ? displayTime.getMinutes()
                      : `0${displayTime.getMinutes()}`}{" "}
                    {displayTime.getHours() < 12 ? "AM" : "PM"}
                  </Text>
                </Pressable>
              )}
              {showDate ? (
                <DateTimePicker
                  mode="date"
                  value={date}
                  onChange={(event, selectedDate) => {
                    setDate(selectedDate);
                    formattedDate(date, period);
                    setShowDate(false);
                  }}
                />
              ) : (
                <Pressable
                  onPress={() => setShowDate(true)}
                  style={styles.formInputDate}
                >
                  <Text
                    style={{
                      fontFamily: "interMedium",
                      color: colors["secondary-bg"],
                      fontSize: 12,
                    }}
                  >
                    {`${displayDate.getDate()}-${
                      displayDate.getMonth() + 1
                    }-${displayDate.getFullYear()}`}
                  </Text>
                </Pressable>
              )}
            </View>

            <TextInput
              placeholderTextColor={colors["secondary-bg"]}
              onChangeText={(val) =>
                setBooking({
                  ...booking,
                  address: { ...booking.address, block: val },
                })
              }
              value={booking.address.block}
              placeholder="Address"
              style={styles.formInputAddress}
              multiline
            />
          </View>
          <View style={styles.formActions}>
            <TouchableOpacity
              onPress={handlePaymentProceed}
              style={styles.checkoutBtnPayment}
            >
              <Text
                style={{
                  fontFamily: "interBold",
                  color: colors["card-primary"],
                }}
              >
                Proceed to payment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkoutBtnLater}
              onPress={handlePayLater}
            >
              <Text
                style={{
                  fontFamily: "interBold",
                  color: colors["card-primary"],
                }}
              >
                Create booking and pay later
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkoutBtnCoin}
              onPress={handleCoinPayment}
            >
              <Text
                style={{
                  fontFamily: "interBold",
                  color: colors["icon-active"],
                }}
              >
                Pay with HomieCoin
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreateBooking;
