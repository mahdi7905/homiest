import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const ServiceContext = createContext();

let prevState = {
  serviceMen: [],
};

const serviceReducer = (state, action) => {
  switch (action.type) {
    case "SET_SERVICES":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const ServiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serviceReducer, prevState);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/services/");
        dispatch({ type: "SET_SERVICES", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, []);
  return (
    <ServiceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContextProvider;
