const express = require("express");

const {
  createBookingController,
  getBookingsController,
  bookingSucess,
} = require("../controllers/bookingController");

const bookingRouter = express.Router();

bookingRouter.get("/bookings", getBookingsController);
bookingRouter.post("/booking-success/:booking_id", bookingSucess);
bookingRouter.post("/create-booking", createBookingController);

module.exports = { bookingRouter };
