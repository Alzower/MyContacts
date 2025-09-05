import mongoose from "mongoose";

export const registerModel = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
});
