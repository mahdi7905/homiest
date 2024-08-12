import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { colors } from "../constants/colors";

const CategoryCard = ({ profession }) => {
  const router = useRouter();
  const handleSearch = () => {
    router.push(`Services?searchTerm=${profession}`);
  };
  const banner =
    profession === "Carpentry"
      ? require("../assets/professions/Carpentry.jpg")
      : profession === "Chef"
      ? require("../assets/professions/Chef.jpg")
      : profession === "Cleaning"
      ? require("../assets/professions/Cleaner.jpg")
      : profession === "Gardener"
      ? require("../assets/professions/Gardener.jpg")
      : profession === "Laundry"
      ? require("../assets/professions/Laundry.jpg")
      : profession === "Masonry"
      ? require("../assets/professions/Mason.jpg")
      : profession === "Mechanic"
      ? require("../assets/professions/Mechanic.jpg")
      : profession === "Painter"
      ? require("../assets/professions/Painter.jpg")
      : profession === "Wiring"
      ? require("../assets/professions/Wiring.jpg")
      : null;
  return (
    <TouchableOpacity style={{ marginBottom: 20 }} onPress={handleSearch}>
      <Image
        source={banner}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: 30,
          marginBottom: 10,
          borderColor: colors["secondary-bg"],
          borderWidth: 2,
        }}
      />
      <Text
        style={{
          fontFamily: "interSemiBold",
          fontSize: 18,
          color: colors["font-profession"],
          textAlign: "center",
        }}
      >
        {profession}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
