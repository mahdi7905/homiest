import React, { useContext } from "react";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import "./constants/utility.css";
import "./App.css";

import NavBar from "./components/navBar/NavBar";
import Home from "./routes/home/Home";
import Messages from "./routes/messages/Messages";
import Booking from "./routes/bookings/Booking";
import Categories from "./routes/categories/Categories";
import Notifications from "./routes/notifications/Notifications";
import Wallet from "./routes/wallet/Wallet";
import Settings from "./routes/settings/Settings";
import Drawer from "./components/drawer/Drawer";
import Services from "./routes/services/Services";
import ServiceDetails from "./routes/serviceDetails/ServiceDetails";
import CreateBooking from "./routes/createBooking/CreateBooking";
import { AuthContext } from "./context/authContext";
import Auth from "./routes/auth/Auth";
import RequireAuth from "./components/RequireAuth";
import useAuth from "./hooks/useAuth";
import Admin from "./routes/admin/Admin";
import AddService from "./routes/admin/AddService";
import AdminServices from "./routes/admin/AdminServices";
import AdminBookings from "./routes/admin/AdminBookings";
import Checkout from "./routes/checkout/Checkout";
import Packages from "./routes/packages/Packages";
import CheckoutPackages from "./routes/checkoutPackages/CheckoutPackages";

function App() {
  const { user } = useContext(AuthContext);
  const { Logout } = useAuth();
  return (
    <main>
      {user?.role === "consumer" && (
        <>
          <Drawer />
          <NavBar />
        </>
      )}
      <section className="appContainer">
        <div className="content-container">
          {user?.role === "consumer" && (
            <div className="special-links">
              <ul>
                <li>
                  <NavLink to="/wallet">
                    <AccountBalanceWalletIcon />
                    <p>Wallet</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings">
                    <SettingsIcon />
                    <p>Settings</p>
                  </NavLink>
                </li>
                <li>
                  <button className="logout-btn" onClick={() => Logout()}>
                    <LogoutIcon />
                    <p>Logout</p>
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div className="contents">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/messages"
                element={
                  <RequireAuth>
                    <Messages />
                  </RequireAuth>
                }
              />
              <Route
                path="/bookings"
                element={
                  <RequireAuth>
                    <Booking />
                  </RequireAuth>
                }
              />
              <Route
                path="/categories"
                element={
                  <RequireAuth>
                    <Categories />
                  </RequireAuth>
                }
              />
              <Route
                path="/notifications"
                element={
                  <RequireAuth>
                    <Notifications />
                  </RequireAuth>
                }
              />
              <Route
                path="/wallet"
                element={
                  <RequireAuth>
                    <Wallet />
                  </RequireAuth>
                }
              />
              <Route
                path="/packages"
                element={
                  <RequireAuth>
                    <Packages />
                  </RequireAuth>
                }
              />
              <Route
                path="/checkout-packages"
                element={
                  <RequireAuth>
                    <CheckoutPackages />
                  </RequireAuth>
                }
              />
              <Route
                path="/settings"
                element={
                  <RequireAuth>
                    <Settings />
                  </RequireAuth>
                }
              />
              <Route
                path="/services"
                element={
                  <RequireAuth>
                    <Services />
                  </RequireAuth>
                }
              />
              <Route
                path="/service-details/:serviceId"
                element={
                  <RequireAuth>
                    <ServiceDetails />
                  </RequireAuth>
                }
              />
              <Route
                path="/create-booking"
                element={
                  <RequireAuth>
                    <CreateBooking />
                  </RequireAuth>
                }
              />
              <Route
                path="/checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  user && user?.role === "admin" ? (
                    <Admin />
                  ) : user && user?.role === "consumer" ? (
                    <Navigate to="/" />
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              >
                <Route path="admin-services" element={<AdminServices />} />
                <Route path="add-service" element={<AddService />} />
                <Route path="admin-bookings" element={<AdminBookings />} />
              </Route>
              <Route
                path="/auth"
                element={!user ? <Auth /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
