import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "../../../../components/PackageCard";
import { styles } from "../../../../constants/styles";
import { colors } from "../../../../constants/colors";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setloading(true);
        const { data } = await axios.get(
          "http://172.20.10.4:4000/api/homie-coins-packages"
        );
        setPackages(data);
        setloading(false);
      } catch (error) {
        console.log(error.message);
        setloading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <View style={styles.packageContainer}>
      {loading && (
        <View
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="medium" color={colors["secondary-bg"]} />
        </View>
      )}
      {packages.length > 0 && !loading && (
        <FlatList
          data={packages}
          renderItem={({ item }) => <PackageCard item={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
      {packages.length <= 0 && !loading && (
        <Text style={{ fontFamily: "interMedium", fontSize: 20 }}>
          No packages available
        </Text>
      )}
    </View>
  );
};

export default Packages;
