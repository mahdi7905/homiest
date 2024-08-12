import { View, Text, FlatList, ScrollView, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { ServiceContext } from "../../../../context/serviceContext";
import ServiceCard from "../../../../components/ServiceCard";
import { styles } from "../../../../constants/styles";
import BackBtn from "../../../../components/BackBtn";
import { colors } from "../../../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Services = () => {
  const { top } = useSafeAreaInsets();
  const { searchTerm } = useLocalSearchParams();
  const { serviceMen } = useContext(ServiceContext);
  if (searchTerm && searchTerm.length > 3) {
    var searchResult = serviceMen.filter((service) =>
      service.profession.toLowerCase().includes(`${searchTerm.toLowerCase()}`)
    );
  } else {
    var searchResult = [];
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors["primary-bg"],
        position: "relative",
      }}
    >
      <View style={{ position: "absolute", top: top, left: 10, zIndex: 111 }}>
        <BackBtn />
      </View>
      {searchTerm && searchResult.length > 0 ? (
        <FlatList
          data={searchResult}
          renderItem={({ item }) => <ServiceCard item={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      ) : searchTerm && searchResult.length === 0 ? (
        <View style={{ paddingTop: 30 }}>
          <Text
            style={{
              color: colors["font-accent"],
              fontFamily: "InterSemiBold",
              fontSize: 18,
            }}
          >
            No result found
          </Text>
        </View>
      ) : (
        <FlatList
          data={serviceMen}
          renderItem={({ item }) => <ServiceCard item={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Services;
