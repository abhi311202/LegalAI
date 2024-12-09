import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: Number,
    required: true,
    unique: true,
  },
  profession: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  registeredDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
