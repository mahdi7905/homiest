import { View } from "react-native";
import React from "react";
import { styles } from "../../../constants/styles";
import CategoryCard from "../../../components/CategoryCard";

const Categories = () => {
  const professions = [
    "Mechanic",
    "Gardener",
    "Painter",
    "Chef",
    "Masonry",
    "Cleaning",
    "Laundry",
    "Wiring",
    "Carpentry",
  ];
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {professions.map((profession) => (
          <CategoryCard profession={profession} key={profession} />
        ))}
      </View>
    </View>
  );
};

export default Categories;
