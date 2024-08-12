const express = require("express");

const {
  checkoutController,
  purchaseCoinsController,
  purchaseCoinsMobileController,
  packagesController,
  checkoutWithCoinController,
  addCoinsMobile,
  bookingMobileController,
} = require("../controllers/checkoutController");

const checkoutRouter = express.Router();

checkoutRouter.post("/checkout", checkoutController);
checkoutRouter.post("/checkout-with-coins", checkoutWithCoinController);
checkoutRouter.post("/purchase-coins", purchaseCoinsController);
checkoutRouter.post(
  "/purchase-coins-mobile/:package_id",
  purchaseCoinsMobileController
);
checkoutRouter.post("/checkout-mobile/:booking_id", bookingMobileController);
checkoutRouter.post("/add-coins-mobile/:package_id", addCoinsMobile);
checkoutRouter.get("/homie-coins-packages", packagesController);

module.exports = { checkoutRouter };
