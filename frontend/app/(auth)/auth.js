import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";

const auth = () => {
  const { Login, Register, error, setError, isLoading } = useAuth();
  const [signup, setSignup] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showPassConfirm, setShowPassConfirm] = useState(true);

  const [authData, setAuthData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    city: "",
    phone: "",
    block: "",
    role: "consumer",
    avatar: "",
  });

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAuthData({
        ...authData,
        avatar: `data:image/jpeg;base64,${result.assets[0].base64}`,
      });
    }
  };
  const handleAuthToggle = () => {
    setAuthData({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      address: "",
      role: "consumer",
      avatar: "",
    });
    setError({
      username: null,
      password: null,
      confirmPassword: null,
      city: null,
      phone: null,
      block: null,
    });
    setSignup((val) => !val);
    setShowPass(true);
    setImage(null);
  };
  const handleLogin = async () => {
    Login(authData);
  };
  const handleRegister = async () => {
    if (authData.password === authData.confirmPassword) {
      Register(authData);
      // console.log(authData.avatar);
    }

    if (authData.password !== authData.confirmPassword) {
      setError({ ...error, password: "Passwords do not match" });
    }
  };
  return (
    <View style={styles.auth}>
      {/* Login */}
      {!signup && (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={{
            flex: 1,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            style={styles.authCard}
          >
            <Text style={styles.authHeader}>Login</Text>
            {error.username && (
              <Text style={styles.errorText}>{error.username}</Text>
            )}
            <View
              style={
                error.username
                  ? styles.formInputWrapperError
                  : styles.formInputWrapper
              }
            >
              <FontAwesome
                name="user-circle"
                size={24}
                color={
                  error.username ? colors["font-accent"] : colors["font-charge"]
                }
              />
              <TextInput
                disabled={isLoading}
                value={authData.username}
                onChangeText={(val) => {
                  setAuthData({ ...authData, username: val });
                  setError({ ...error, username: null });
                }}
                placeholder="Username"
                placeholderTextColor={
                  error.username ? colors["font-accent"] : colors["font-charge"]
                }
                style={
                  error.username
                    ? styles.authForminputError
                    : isLoading
                    ? styles.disabledAuthFormInput
                    : styles.authFormInput
                }
              />
            </View>
            {error.password && (
              <Text style={styles.errorText}>{error.password}</Text>
            )}
            <View
              style={
                error.password
                  ? styles.formInputWrapperError
                  : styles.formInputWrapper
              }
            >
              <View style={styles.showPassArea}>
                <FontAwesome
                  name="eye"
                  size={24}
                  color={colors["font-charge"]}
                  onPress={() => setShowPass(false)}
                  style={showPass ? styles.on : styles.off}
                />
                <FontAwesome
                  name="eye-slash"
                  size={24}
                  color={colors["font-charge"]}
                  onPress={() => setShowPass(true)}
                  style={showPass ? styles.off : styles.on}
                />
              </View>
              <Entypo
                name="lock-open"
                size={24}
                color={
                  error.password ? colors["font-accent"] : colors["font-charge"]
                }
              />

              <TextInput
                disabled={isLoading}
                placeholderTextColor={
                  error.password ? colors["font-accent"] : colors["font-charge"]
                }
                secureTextEntry={showPass}
                value={authData.password}
                onChangeText={(val) => {
                  setAuthData({ ...authData, password: val });
                  setError({ ...error, password: null });
                }}
                placeholder="Password"
                style={
                  error.password
                    ? styles.authForminputError
                    : isLoading
                    ? styles.disabledAuthFormInput
                    : styles.authFormInput
                }
              />
            </View>
            <TouchableOpacity
              style={styles.authBtn}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={colors["card-primary"]}
                  style={{ alignSelf: "center" }}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: "interBold",
                    color: colors["card-primary"],
                    fontSize: 15,
                  }}
                >
                  Login
                </Text>
              )}
            </TouchableOpacity>
            <View style={styles.toggleAuthSection}>
              <Text style={styles.toggleAuthQuery}>
                Don't have account yet?
              </Text>
              <TouchableOpacity onPress={handleAuthToggle}>
                <Text style={styles.toggleAuth}>Register</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
      {/* Signup */}
      {signup && (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={{
            flex: 1,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
            style={styles.authCard}
          >
            <Text style={styles.authHeader}>Register</Text>
            <View
              style={{
                position: "relative",
                overflow: "hidden",
                borderColor: colors["secondary-bg"],
                borderWidth: 2,
                borderRadius: 100,
                width: 70,
                height: 70,
              }}
            >
              {!image && (
                <Image
                  source={require("../../assets/Avatar.png")}
                  resizeMode="contain"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              {image && (
                <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 2,
                  backgroundColor: "rgba(0,0,0,.3)",
                  position: "absolute",
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => pickImage()}
              >
                <Entypo name="plus" size={15} color={colors["card-bio"]} />
              </TouchableOpacity>
            </View>
            {error.username && (
              <Text style={styles.errorText}>{error.username}</Text>
            )}
            <View
              style={
                error.username
                  ? styles.formInputWrapperError
                  : styles.formInputWrapper
              }
            >
              <FontAwesome
                name="user-circle"
                size={24}
                color={colors["font-charge"]}
              />
              <TextInput
                disabled={isLoading}
                placeholderTextColor={
                  error.username ? colors["font-accent"] : colors["font-charge"]
                }
                value={authData.username}
                onChangeText={(val) => {
                  setAuthData({ ...authData, username: val });
                  setError({ ...error, username: null });
                }}
                placeholder="Username"
                style={
                  error.username
                    ? styles.authForminputError
                    : isLoading
                    ? styles.disabledAuthFormInput
                    : styles.authFormInput
                }
              />
            </View>
            {error.phone && <Text style={styles.errorText}>{error.phone}</Text>}
            <View
              style={
                error.phone
                  ? styles.formInputWrapperError
                  : styles.formInputWrapper
              }
            >
              <MaterialIcons
                name="phone-android"
                size={24}
                color={colors["font-charge"]}
              />

              <TextInput
                keyboardType="numeric"
                disabled={isLoading}
                placeholderTextColor={
                  error.phone ? colors["font-accent"] : colors["font-charge"]
                }
                value={authData.phone}
                onChangeText={(val) => {
                  setAuthData({ ...authData, phone: val });
                  setError({ ...error, phone: null });
                }}
                placeholder="Phone"
                style={
                  error.phone
                    ? styles.authForminputError
                    : isLoading
                    ? styles.disabledAuthFormInput
                    : styles.authFormInput
                }
              />
            </View>
            {error.city && <Text style={styles.errorText}>{error.city}</Text>}
            <View
              style={
                error.city
                  ? styles.formInputWrapperError
                  : styles.formInputWrapper
              }
            >
              <MaterialIcons
                name="location-city"
                size={24}
                color={colors["font-charge"]}
              />

              <TextInput
                disabled={isLoading}
                placeholderTextColor={
                  error.city ? colors["font-accent"] : colors["font-charge"]
                }
                value={authData.city}
                onChangeText={(val) => {
                  setAuthData({ ...authData, city: val });
                  setError({ ...error, city: null });
                }}
                placeholder="City"
                style={
                  error.city
                    ? styles.authForminputError
                    : isLoading
                    ? styles.disabledAuthFormInput
                    : styles.authFormInput
                }
              />
            </View>
            {error.block && <Text style={styles.errorText}>{error.block}</Text>}
            <View
              style={
                error.block
                  ? styles.formInputWrapperError
                  : styles.formInputWrapper
              }
            >
              <MaterialIcons
                name="location-pin"
                size={24}
                color={colors["font-charge"]}
              />

              <TextInput
                disabled={isLoading}
                multiline={true}
                placeholderTextColor={
                  error.block ? colors["font-accent"] : colors["font-charge"]
                }
                value={authData.block}
                onChangeText={(val) => {
                  setAuthData({ ...authData, block: val });
                  setError({ ...error, block: null });
                }}
                placeholder="Address"
                style={
                  error.block
                    ? styles.authForminputError
                    : isLoading
                    ? styles.disabledAuthFormInput
                    : styles.authFormInput
                }
              />
            </View>
            {error.password && (
              <Text style={styles.errorText}>{error.password}</Text>
            )}
            <View
              style={
                error.password
                  ? styles.formInputWrapperError
                  : styles.formInputWrapper
              }
            >
              <View style={styles.showPassArea}>
                <FontAwesome
                  name="eye"
                  size={24}
                  color={colors["font-charge"]}
                  onPress={() => setShowPass(false)}
                  style={showPass ? styles.on : styles.off}
                />
                <FontAwesome
                  name="eye-slash"
                  size={24}
                  color={colors["font-charge"]}
                  onPress={() => setShowPass(true)}
                  style={showPass ? styles.off : styles.on}
                />
              </View>
              <Entypo name="lock" size={24} color={colors["font-charge"]} />

              <TextInput
                disabled={isLoading}
                placeholderTextColor={
                  error.password ? colors["font-accent"] : colors["font-charge"]
                }
                secureTextEntry={showPass}
                value={authData.password}
                onChangeText={(val) => {
                  setAuthData({ ...authData, password: val });
                  setError({ ...error, password: null });
                }}
                placeholder="Password"
                style={
                  error.password
                    ? styles.authForminputError
                    : isLoading
                    ? styles.disabledAuthFormInput
                    : styles.authFormInput
                }
              />
            </View>
            {error.password && (
              <Text style={styles.errorText}>{error.password}</Text>
            )}
            <View
              style={
                error.password
                  ? styles.formInputWrapperError
                  : styles.formInputWrapper
              }
            >
              <View style={styles.showPassArea}>
                <FontAwesome
                  name="eye"
                  size={24}
                  color={colors["font-charge"]}
                  onPress={() => setShowPassConfirm(false)}
                  style={showPassConfirm ? styles.on : styles.off}
                />
                <FontAwesome
                  name="eye-slash"
                  size={24}
                  color={colors["font-charge"]}
                  onPress={(val) => {
                    setAuthData({ ...authData, password: val });
                    setError({ ...error, password: null });
                  }}
                  style={showPassConfirm ? styles.off : styles.on}
                />
              </View>
              <Entypo name="lock" size={24} color={colors["font-charge"]} />
              <TextInput
                disabled={isLoading}
                placeholderTextColor={
                  error.password ? colors["font-accent"] : colors["font-charge"]
                }
                secureTextEntry={showPassConfirm}
                value={authData.confirmPassword}
                onChangeText={(val) => {
                  setAuthData({ ...authData, confirmPassword: val });
                  setError({ ...error, password: null });
                }}
                placeholder="Confirm Password"
                style={
                  error.password
                    ? styles.authForminputError
                    : isLoading
                    ? styles.disabledAuthFormInput
                    : styles.authFormInput
                }
              />
            </View>
            <TouchableOpacity
              style={styles.authBtn}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={colors["card-primary"]}
                  style={{ alignSelf: "center" }}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: "interBold",
                    color: colors["card-primary"],
                    fontSize: 15,
                  }}
                >
                  Register
                </Text>
              )}
            </TouchableOpacity>
            <View style={styles.toggleAuthSection}>
              <Text style={styles.toggleAuthQuery}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={handleAuthToggle}>
                <Text style={styles.toggleAuth}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default auth;
