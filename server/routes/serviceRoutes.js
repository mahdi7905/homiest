const express = require("express");

const {
  services,
  addServiceController,
} = require("../controllers/serviceController");

const serviceRouter = express.Router();

serviceRouter.get("/services", services);
serviceRouter.post("/add-service", addServiceController);

module.exports = { serviceRouter };
