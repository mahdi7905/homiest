import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import DrawerContextProvider from "./context/drawerContext";
import ServiceContextProvider from "./context/serviceContext";
import AuthContextProvider from "./context/authContext";
import BookingContextProvider from "./context/bookingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BookingContextProvider>
        <ServiceContextProvider>
          <DrawerContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </DrawerContextProvider>
        </ServiceContextProvider>
      </BookingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
