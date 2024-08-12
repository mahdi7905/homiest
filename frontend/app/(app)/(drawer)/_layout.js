import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { View, Text, Pressable, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import useAuth from "../../../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { colors } from "../../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const customDrawer = (props) => {
  const { user } = useContext(AuthContext);
  const { Logout } = useAuth();
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          paddingTop: 10 + top,
          alignItems: "center",
          gap: 10,
          backgroundColor: colors["secondary-bg"],
          flexDirection: "row",
          marginBottom: -40,
        }}
      >
        <Image
          source={{ uri: user?.avatar }}
          resizeMode="cover"
          style={{
            width: 50,
            height: 50,
            borderRadius: 200,
            borderColor: colors["tab-bg"],
            borderWidth: 2,
          }}
        />
        <Text
          style={{
            fontFamily: "interExtraBold",
            fontSize: 18,
            color: colors["tab-bg"],
          }}
        >
          @{user?.username}
        </Text>
      </View>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 10, alignItems: "center" }}>
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: colors["tab-bg"],
            borderColor: colors["secondary-bg"],
            borderWidth: 2,
            outline: "none",
            padding: 10,
            width: "100%",
            borderRadius: 5,
          }}
          onPress={() => Logout()}
        >
          <MaterialIcons
            name="logout"
            size={24}
            color={colors["secondary-bg"]}
          />
          <Text
            style={{
              fontFamily: "interBold",
              color: colors["secondary-bg"],
              fontSize: 15,
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={customDrawer}
        screenOptions={{
          headerTitle: "",
          drawerHideStatusBarOnOpen: true,
          headerShadowVisible: false,
          drawerActiveBackgroundColor: colors["secondary-bg"],
          drawerActiveTintColor: colors["tab-bg"],
          drawerInactiveTintColor: colors["secondary-bg"],
          drawerStyle: { backgroundColor: colors["card-bio"] },
          drawerLabelStyle: { fontFamily: "interBold", marginLeft: -20 },
          headerStyle: {
            backgroundColor: colors["secondary-bg"],
          },
        }}
      >
        <Drawer.Screen
          name="(home)"
          options={{
            headerShown: false,
            drawerLabel: "Home",
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Notifications"
          options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="notifications" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="(wallet)"
          options={{
            headerShown: false,
            drawerLabel: "Wallet",
            drawerIcon: ({ color }) => (
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;
