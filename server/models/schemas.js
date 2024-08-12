const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isStrongPassword } = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [isStrongPassword, "Password is too weak"],
  },
  phone: String,
  address: {
    city: { type: String, required: [true, "City is required"] },
    block: { type: String, required: [true, "Address is required"] },
  },
  role: {
    type: String,
    required: [true, "User Must be assigned a role"],
    default: "consumer",
  },
  avatar: String,
  wallet: {
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});

UserSchema.statics.register = async function (
  username,
  password,
  phone,
  role,
  city,
  block,
  avatar
) {
  const exist = await this.findOne({ username });
  if (exist) {
    console.log(exist._id);
    throw new Error("Username already in use");
  }
  const address = {
    city,
    block,
  };
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    password: hashed,
    phone,
    role,
    avatar,
    address,
  });
  return user;
};
UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const matchingPass = await bcrypt.compare(password, user.password);
    console.log(matchingPass);
    if (matchingPass) {
      return user;
    }
    throw new Error("Password Incorrect");
  }
  throw new Error("User could not be found");
};

const ServiceSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  surName: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  bio: {
    type: String,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
  avatar: String,
  role: String,
  recommendations: [
    {
      type: String,
      user: mongoose.SchemaType.ObjectId,
    },
  ],
});

const BookingSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  service: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Service",
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  schedule: {
    type: Date,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
  acknowledgement: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Booking = mongoose.model("Bookings", BookingSchema);
const Service = mongoose.model("Service", ServiceSchema);
const User = mongoose.model("User", UserSchema);
module.exports = { Service, User, Booking };
