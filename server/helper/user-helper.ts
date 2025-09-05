import mongoose from "mongoose";
import { userModel } from "../models/user.model";

export async function findUserByEmail(email: string) {
  return await mongoose.model("users", userModel).findOne({ email });
}
