import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useContext, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { styles } from "../../../../constants/styles";
import { colors } from "../../../../constants/colors";
import { BookingContext } from "../../../../context/bookingContext";

const PUBLIC_KEY =
  "pk_test_51OuSNaAjavyPtfEB537khzJc727jmJl3j8mGj775Mib1aZ8T9S2OviqVRLrfiiFv0Z8vMZegM2WuNuBQlsmqsnLz00G9XYqZca";

const Checkout = () => {
  const { booking_id } = useLocalSearchParams();
  const router = useRouter();
  const { dispatch } = useContext(BookingContext);
  const [cardDetails, setCardDetails] = useState();
  const [isLoading, setIsLoading] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const { data } = await axios.post(
      `http://172.20.10.4:4000/api/checkout-mobile/${booking_id}`
    );
    const { clientSecret, error } = data;
    return { clientSecret, error };
  };

  const handlePayment = async () => {
    setIsLoading(true);
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      setIsLoading(false);
      Alert.alert("Please enter Complete card details");
      return;
    }

    //2.Fetch the intent client secret from the backend
    try {
      setIsLoading(true);
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        Alert.alert("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          paymentMethodType: "Card",
        });
        if (error) {
          setIsLoading(false);
          Alert.alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          const { data } = await axios.post(
            `http://172.20.10.4:4000/api/booking-success/${booking_id}`
          );
          dispatch({ type: "BOOKING_CHECKOUT", payload: data });
          router.replace("/Bookings");
          setIsLoading(false);
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <StripeProvider publishableKey={PUBLIC_KEY}>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors["card-bio"],
          }}
        >
          <Text
            style={{
              fontFamily: "interExtraBold",
              textAlign: "center",
              color: colors["secondary-bg"],
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Enter Card Details
          </Text>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: colors["card-primary"],
              borderColor: colors["secondary-bg"],
              borderWidth: 2,
              borderRadius: 5,
              placeholderColor: colors["font-charge"],
              textColor: colors["font-charge"],
            }}
            style={styles.cardContainer}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />

          <TouchableOpacity
            style={styles.checkoutBtnPayment}
            onPress={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator
                size="medium"
                color={colors["primary-bg"]}
                style={{ margin: 7 }}
              />
            ) : (
              <Text
                style={{
                  fontFamily: "interMedium",
                  color: colors["primary-bg"],
                }}
              >
                Pay
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </StripeProvider>
    </View>
  );
};

export default Checkout;
