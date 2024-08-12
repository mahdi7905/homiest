import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [authError, setAuthError] = useState({
    username: null,
    password: null,
    confirmPassword: null,
    city: null,
    phone: null,
    block: null,
  });
  const Login = async (authData) => {
    if (!authData.username || authData.username === "") {
      setAuthError({ ...authError, username: "Username is required" });
      return;
    }
    if (!authData.password || authData.password === "") {
      setAuthError({ ...authError, password: "Password is required" });
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        authData
      );
      localStorage.setItem("user", JSON.stringify(data));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.user.token}`;
      dispatch({ type: "SET_USER", payload: data });
      if (data.user?.role === "consumer") {
        navigate("/", { replace: true });
      }
      if (data.user?.role === "admin") {
        navigate("/admin", { replace: true });
      }
    } catch (err) {
      console.log(err.message);
      const { error } = err.response.data;
      setAuthError({
        ...authError,
        username: error.username,
        password: error.password,
      });
    }
  };
  const Register = async (authData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register",
        authData
      );
      localStorage.setItem("user", JSON.stringify(data));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.user.token}`;
      dispatch({ type: "SET_USER", payload: data });
      if (data.user?.role === "consumer") {
        navigate("/", { replace: true });
      }
      if (data.user?.role === "admin") {
        navigate("/admin", { replace: true });
      }
    } catch (err) {
      const { error } = err.response.data;
      setAuthError({
        ...authError,
        username: error.username,
        password: error.password,
        city: error["address.city"],
        block: error["address.block"],
      });
    }
  };
  const Logout = () => {
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({ type: "LOGOUT" });
  };
  return { Login, Register, Logout, authError, setAuthError };
};

export default useAuth;
