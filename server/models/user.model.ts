import mongoose from "mongoose";

export const userModel = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    require: true,
  },
  passowrd: {
    type: String,
    require: true,
  },
});
