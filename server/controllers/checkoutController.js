const { Booking, User } = require("../models/schemas");
const { packages } = require("../data/packages");
const stripe = require("stripe")(process.env.STRIPE);

const packagesController = async (req, res) => {
  res.status(200).json(packages);
};
const checkoutController = async (req, res) => {
  const { id, _id } = req.body;
  try {
    const booking = await Booking.findById(_id).populate("service");
    const amount = Math.floor((booking.charge / 1500) * 100);
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Homiest booking payment",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000/bookings",
    });
    if (payment.status === "succeeded") {
      booking.paymentStatus = "Success";
      await booking.save();
    }
    res.status(200).json({ booking, success: true });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Payment Failed" });
  }
};

const checkoutWithCoinController = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findById(req.user);
    const booking = await Booking.findById(_id).populate("service");
    if (user.wallet.balance >= booking.charge) {
      booking.paymentStatus = "Success";
      await booking.save();
      user.wallet.balance -= booking.charge;
      await user.save();
    }
    res.status(200).json({ booking, wallet: user.wallet, success: true });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Payment Failed" });
  }
};

const purchaseCoinsController = async (req, res) => {
  const { id, _id } = req.body;
  try {
    const user = await User.findById(req.user);
    const package = packages.filter((item) => item._id === Number(_id));
    const amount = Math.floor((package[0].price / 1500) * 100);
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Homie Coin Purchase",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000/wallet",
    });
    if (payment.status === "succeeded") {
      user.wallet.balance += package[0].coins;
      await user.save();
    }
    res.status(200).json({ balance: user.wallet.balance });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Payment Failed" });
  }
};

const purchaseCoinsMobileController = async (req, res) => {
  const { package_id } = req.params;
  try {
    const package = packages.filter((item) => item._id === Number(package_id));
    const amount = Math.floor((package[0].price / 1500) * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount, //lowest denomination of particular currency
      currency: "usd",
      description: "Homie Coin Purchase",
      payment_method_types: ["card"], //by default
    });
    console.log(paymentIntent);
    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
const bookingMobileController = async (req, res) => {
  const { booking_id } = req.params;
  try {
    const booking = await Booking.findById(booking_id).populate("service");
    const amount = Math.floor((booking.charge / 1500) * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount, //lowest denomination of particular currency
      currency: "usd",
      description: "Homie Coin Purchase",
      payment_method_types: ["card"], //by default
    });
    console.log(paymentIntent);
    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

const addCoinsMobile = async (req, res) => {
  const { package_id } = req.params;

  try {
    const user = await User.findById(req.user);
    const package = packages.filter((item) => item._id === Number(package_id));
    user.wallet.balance += package[0].coins;
    await user.save();
    res.status(200).json({ balance: user.wallet.balance });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Payment Failed" });
  }
};

module.exports = {
  checkoutController,
  purchaseCoinsController,
  purchaseCoinsMobileController,
  packagesController,
  checkoutWithCoinController,
  addCoinsMobile,
  bookingMobileController,
};
