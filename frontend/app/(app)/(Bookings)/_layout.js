import { Stack } from "expo-router";
import { colors } from "../../../constants/colors";

export default Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors["secondary-bg"] },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: colors["font-hearder"],
          fontFamily: "interBold",
          fontSize: 20,
        },
      }}
    />
  );
};
