import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "../../../constants/styles";

const Messages = () => {
  const [meassages, setMessages] = useState(false);
  return (
    <View style={styles.mainContainer}>
      {!meassages ? (
        <Text
          style={{
            fontFamily: "interBold",
            textAlign: "center",
            fontSize: 18,
            marginVertical: 20,
          }}
        >
          You have no messages
        </Text>
      ) : (
        <Text>Messages</Text>
      )}
    </View>
  );
};

export default Messages;
