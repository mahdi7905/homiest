const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { serviceRouter } = require("./routes/serviceRoutes");
const { default: mongoose } = require("mongoose");
const { userRouter } = require("./routes/userRoutes");
const { requireAuth } = require("./middleware/requireAuth");
const { bookingRouter } = require("./routes/bookingRoutes");
const { checkoutRouter } = require("./routes/checkoutRoutes");

const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 4000, () =>
      console.log("db connected and server running on port 4000")
    );
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/api/auth", userRouter);
app.use("/api", requireAuth, serviceRouter);
app.use("/api", requireAuth, bookingRouter);
app.use("/api", requireAuth, checkoutRouter);
