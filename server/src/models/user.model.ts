import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const UserModel = new mongoose.Schema({
   id: {
    type: String,
    default: () => nanoid(10), 
    unique: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
