import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import { colors } from "../../constants/colors";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ServiceContextProvider from "../../context/serviceContext";
import { AuthContext } from "../../context/authContext";
import BookingContextProvider from "../../context/bookingContext";

export default Layout = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Redirect href="auth" />;
  }
  if (user) {
    return (
      <ServiceContextProvider>
        <BookingContextProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: colors["icon-active"],
              tabBarInactiveTintColor: colors["icon-inactive"],
              tabBarLabelStyle: {
                fontFamily: "interExtraBold",
              },
              tabBarStyle: {
                backgroundColor: colors["tab-bg"],
                borderWidth: 0,
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
              },
            }}
          >
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen
              name="(drawer)"
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="home" size={24} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="(Categories)"
              options={{
                tabBarLabel: "Categories",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="category" size={24} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="(Bookings)"
              options={{
                tabBarLabel: "Bookings",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="clipboard-list-outline"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="(Messages)"
              options={{
                tabBarLabel: "Messages",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="message1" size={24} color={color} />
                ),
              }}
            />
          </Tabs>
        </BookingContextProvider>
      </ServiceContextProvider>
    );
  }
};
