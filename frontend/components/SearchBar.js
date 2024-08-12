import { View, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../constants/styles";
import { colors } from "../constants/colors";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`Services?searchTerm=${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search"
        placeholderTextColor={colors["font-hearder"]}
        style={styles.searchBox}
        value={searchTerm}
        onChangeText={(val) => setSearchTerm(val)}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => handleSearch()}
      >
        <Ionicons name="search" size={20} color={colors["secondary-bg"]} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
