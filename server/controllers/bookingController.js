const { Booking } = require("../models/schemas");

const getBookingsController = async (req, res) => {
  try {
    const user = req.user;
    const bookings = await Booking.find({ user }).populate("service");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createBookingController = async (req, res) => {
  try {
    const created_booking = await Booking.create({ ...req.body });
    const booking = await created_booking.populate("service");
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const bookingSucess = async (req, res) => {
  const { booking_id } = req.params;
  try {
    const booking = await Booking.findById(booking_id).populate("service");
    booking.paymentStatus = "Success";
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: "There was an error" });
  }
};

module.exports = {
  createBookingController,
  getBookingsController,
  bookingSucess,
};
