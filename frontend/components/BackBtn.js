import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "expo-router";
import React from "react";
import { colors } from "../constants/colors";

const BackBtn = () => {
  const router = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => router.goBack()}
      style={{
        padding: 2,
        backgroundColor: colors["btn-secondary"],
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <Ionicons name="chevron-back" size={24} color={colors["primary-bg"]} />
    </TouchableOpacity>
  );
};

export default BackBtn;
