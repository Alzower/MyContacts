import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const ContactModel = new mongoose.Schema({
    id: {
      type: String,
      default: () => nanoid(10), 
      unique: true,
    },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
    required: true,
  }
});
