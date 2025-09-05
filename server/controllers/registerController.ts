import { Request, Response } from "express";
import mongoose from "mongoose";
import { findUserByEmail } from "../helper/user-helper";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !password) {
    return res.send("email and pasword is required");
  }

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .send("Invalid email address. Please provide a valid email.");
  }

  if (await findUserByEmail(email)) {
    return res.status(400).send("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await mongoose
      .model("users", UserModel)
      .create({ email, password: hashedPassword });
    res.send("User is registered");
  } catch (error) {
    res.send(error);
  }
};
