import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { colors } from "../constants/colors";

const Btn = ({ title, size, round, variant, route }) => {
  const router = useRouter();
  return (
    <Pressable
      style={{
        backgroundColor:
          variant === "contained" ? colors["btn-primary"] : "transparent",
        borderColor: colors["btn-primary"],
        borderWidth: variant === "outlined" ? 2 : 2,
        borderRadius: round ? 100 : 5,
        paddingHorizontal: size === "regular" ? 10 : size === "big" ? 15 : 10,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() =>
        route ? router.push(`/${route}`) : console.log("button pressed")
      }
    >
      <Text
        style={{
          fontFamily: "interBold",
          fontSize: 10,
          color:
            variant === "contained"
              ? colors["card-secondary"]
              : colors["btn-primary"],
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Btn;
