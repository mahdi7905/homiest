import { Stack, useNavigation } from "expo-router";
import { colors } from "../../../../constants/colors";
import { View, TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default Layout = () => {
  const navigation = useNavigation();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors["secondary-bg"],
          height: 50,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                height: "100%",
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
              >
                <Ionicons name="menu" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="CreateBooking"
        options={{
          headerShown: true,
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: colors["card-bio"],
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "interBold",
            color: colors["font-hearder"],
          },
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerShown: true,
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: colors["card-bio"],
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "interBold",
            color: colors["font-hearder"],
          },
        }}
      />
    </Stack>
  );
};
