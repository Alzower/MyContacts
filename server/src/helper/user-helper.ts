import mongoose from "mongoose";
import { UserModel } from "../models/user.model";

export async function findUserByEmail(email: string) {
  return await mongoose.model("users", UserModel).findOne({ email });
}
