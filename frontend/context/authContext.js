import { createContext, useReducer, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const AuthContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "HOMIE_COIN":
      return {
        ...state,
        user: { ...state.user, wallet: action.payload },
      };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  useEffect(() => {
    const fetchUser = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        const { data } = await axios.post(
          "http://172.20.10.4:4000/api/auth/get-user",
          { token }
        );
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch({ type: "SET_USER", payload: data });
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
