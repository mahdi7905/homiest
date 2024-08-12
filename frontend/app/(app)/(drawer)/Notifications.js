import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "../../../constants/styles";

const notifications = () => {
  const [notifications, setNotification] = useState(false);
  return (
    <View style={styles.mainContainer}>
      {!notifications ? (
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "interBold",
              textAlign: "center",
              fontSize: 18,
              marginVertical: 20,
            }}
          >
            You have no notification
          </Text>
        </ScrollView>
      ) : (
        <Text>notifications</Text>
      )}
    </View>
  );
};

export default notifications;
