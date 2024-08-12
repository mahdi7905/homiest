import { Stack, useRouter, useNavigation } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";

export default Layout = () => {
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        headerShadowVisible: false,
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              flex: 1,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
              >
                <Ionicons
                  name="menu"
                  size={30}
                  color={colors["font-hearder"]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colors["font-hearder"]}
                />
              </TouchableOpacity>
            </View>
          </View>
        ),
        headerStyle: {
          backgroundColor: colors["secondary-bg"],
          height: 50,
        },
      }}
    >
      <Stack.Screen
        name="Wallet"
        options={{
          headerTitle: () => (
            <View
              style={{
                height: "100%",
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={{ display: "flex", flexDirection: "row", gap: 10 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
              >
                <Ionicons
                  name="menu"
                  size={30}
                  color={colors["font-hearder"]}
                />
              </TouchableOpacity>
            </View>
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Packages"
        options={{
          headerShown: true,
          headerTintColor: colors["primary-bg"],
        }}
      />
      <Stack.Screen
        name="PackagePayment"
        options={{
          headerShown: true,
          headerTintColor: colors["primary-bg"],
        }}
      />
    </Stack>
  );
};
