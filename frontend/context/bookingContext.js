import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const BookingContext = createContext();

const bookingReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKINGS":
      return [...state, ...action.payload];
    case "CREATE_BOOKING":
      return [...state, action.payload];
    case "BOOKING_CHECKOUT":
      return state.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    default:
      return state;
  }
};

const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, []);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "http://172.20.10.4:4000/api/bookings"
        );
        dispatch({ type: "SET_BOOKINGS", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);
  return (
    <BookingContext.Provider value={{ bookings: state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;
