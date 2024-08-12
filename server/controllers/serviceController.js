const { Service } = require("../models/schemas");

const services = async (req, res) => {
  const serviceMen = await Service.find({});
  const services = serviceMen
    .map((service) => ({
      sort: Math.random(),
      service,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.service);
  res.status(200).json({ serviceMen: services });
};

const addServiceController = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ mssg: "an error occured. service was not added" });
  }
};

module.exports = {
  services,
  addServiceController,
};
