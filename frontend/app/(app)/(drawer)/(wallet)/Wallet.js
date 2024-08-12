import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { styles } from "../../../../constants/styles";
import { AuthContext } from "../../../../context/authContext";

const wallet = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  return (
    <>
      <View style={[styles.mainContainer, styles.wallet]}>
        <Text style={styles.walletFont}>
          <Text>You have </Text>
          <Text style={user.wallet.balance >= 50 ? styles.good : styles.low}>
            {user.wallet.balance}
          </Text>
          <Text> Homie Coins</Text>
        </Text>
        <TouchableOpacity
          style={styles.rechargeWallet}
          onPress={() => router.push("/Packages")}
        >
          <Text style={styles.rechargetext}>Recharge Wallet</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default wallet;
