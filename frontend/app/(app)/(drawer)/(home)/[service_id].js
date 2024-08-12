import { View, Text, Image, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { ServiceContext } from "../../../../context/serviceContext";
import { styles } from "../../../../constants/styles";
import BackBtn from "../../../../components/BackBtn";
import { colors } from "../../../../constants/colors";
import Btn from "../../../../components/Btn";
import StarRating from "../../../../components/StarRating";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Service = () => {
  const { top } = useSafeAreaInsets();
  const { service_id } = useLocalSearchParams();
  const { serviceMen } = useContext(ServiceContext);
  const service = serviceMen.filter((item) => item._id === service_id)[0];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.mainContainer}>
        <View
          style={{
            position: "absolute",
            top: top,
            left: 20,
            zIndex: 1111,
          }}
        >
          <BackBtn />
        </View>
        <Image
          source={{ uri: service.avatar }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 300,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "interSemiBold",
                fontSize: 20,
                color: colors["font-name"],
              }}
            >
              {service.firstName} {service.surName}
            </Text>
            <Text
              style={{
                fontFamily: "interExtraBold",
                fontSize: 12,
                color: colors["font-charge"],
              }}
            >{`N ${service.charge} / h`}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View style={{ width: "49%" }}>
              <Btn
                title="Book Now"
                round={false}
                variant="contained"
                size="big"
                route={`CreateBooking?service_id=${service._id}`}
              />
            </View>
            <View style={{ width: "49%" }}>
              <Btn
                round={false}
                title="Message"
                variant="outlined"
                size="big"
                style={{ width: "50%" }}
                route="Messages"
              />
            </View>
          </View>
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              marginBottom: 20,
              backgroundColor: colors["card-bio"],
            }}
          >
            <Text
              style={{
                fontFamily: "interMedium",
                fontSize: 16,
                color: colors["font-bio"],
              }}
            >
              {service.bio}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "interBold",
                fontSize: 20,
                marginBottom: 10,
                color: colors["font-name"],
              }}
            >
              Profession:
              <Text
                style={{
                  fontFamily: "interMedium",
                  fontSize: 20,
                  marginLeft: 15,
                  color: colors["font-profession"],
                }}
              >
                {service.profession}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: "interBold",
                fontSize: 20,
                marginBottom: 10,
                color: colors["font-name"],
              }}
            >
              Location:
              <Text
                style={{
                  fontFamily: "interMedium",
                  fontSize: 20,
                  marginLeft: 5,
                  color: colors["font-location"],
                }}
              >
                {service.location}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "interBold",
                  fontSize: 20,
                  color: colors["font-name"],
                }}
              >
                Rating:
              </Text>
              <StarRating rating={service.rating} />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "interSemiBold",
                fontSize: 27,
                color: colors["font-recommendation"],
                marginBottom: 10,
              }}
            >
              Recommendations
            </Text>
            <View>
              {service.recommendations.map((recommendation, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    marginBottom: 10,
                    width: "100%",
                  }}
                >
                  <Image
                    source={require("../../../../assets/samplePics/me1.jpg")}
                    resizeMode="cover"
                    style={{ width: 50, height: 50, borderRadius: 200 }}
                  />
                  <View
                    style={{
                      width: "calc(100% - 60px)",
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: colors["card-primary"],
                    }}
                  >
                    <Text
                      style={{
                        width: "100%",
                        fontFamily: "interSemiBold",
                        fontSize: 16,
                        color: colors["font-profession"],
                      }}
                    >
                      {recommendation.comment}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Service;
