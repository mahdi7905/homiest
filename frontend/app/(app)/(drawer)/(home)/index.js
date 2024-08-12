import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Drawer } from "expo-router/drawer";
import React, { useContext } from "react";
import { ServiceContext } from "../../../../context/serviceContext";
import { styles } from "../../../../constants/styles";
import SearchBar from "../../../../components/SearchBar";
import TrendingCard from "../../../../components/TrendingCard";
import PopularCard from "../../../../components/PopularCard";
import ServiceCard from "../../../../components/ServiceCard";
import { Link } from "expo-router";
import { colors } from "../../../../constants/colors";

const Home = () => {
  const { serviceMen } = useContext(ServiceContext);
  const trending = serviceMen.filter((man) => man.rating >= 4);
  const popular = serviceMen.slice(25, 40);
  const services = serviceMen.slice(0, 30);

  return (
    <>
      {/* <Drawer.Screen
        options={{
          headerShown: true,
        }}
      /> */}
      <View style={styles.mainContainer}>
        <SearchBar />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.trendingSection}>
            <Text style={styles.textHeader}>Most Rated</Text>
            {!trending || trending.length <= 0 ? (
              <View
                style={{
                  flex: 1,
                  padding: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator
                  size={"medium"}
                  color={colors["btn-primary"]}
                />
              </View>
            ) : (
              <FlatList
                data={trending}
                renderItem={({ item }) => <TrendingCard item={item} />}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
          <View style={styles.popularSection}>
            <Text style={styles.textHeader}>Popular</Text>
            {!popular || popular.length <= 0 ? (
              <View
                style={{
                  flex: 1,
                  padding: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator
                  size={"medium"}
                  color={colors["btn-primary"]}
                />
              </View>
            ) : (
              <FlatList
                data={popular}
                renderItem={({ item }) => <PopularCard item={item} />}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
          <View style={styles.serviceSection}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.textHeader}>Services</Text>
              <Link href="Services" asChild>
                <Text
                  style={{
                    color: colors["font-link"],
                    fontFamily: "interRegular",
                    fontSize: 12,
                  }}
                >
                  See More
                </Text>
              </Link>
            </View>
            {!services || services.length <= 0 ? (
              <View
                style={{
                  flex: 1,
                  padding: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator
                  size={"medium"}
                  color={colors["btn-primary"]}
                />
              </View>
            ) : (
              <FlatList
                data={services}
                renderItem={({ item }) => <ServiceCard item={item} />}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
