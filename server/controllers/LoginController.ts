import { Request, Response } from "express";
import { findUserByEmail } from "../helper/user-helper";
import bcrypt from "bcrypt";

export const loginController = async (req: Request, res: Response) => {
  const jwt = require("jsonwebtoken");

  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) return res.status(404).send("user not found");

  const checkPasswordValid = await bcrypt.compare(password, user.password);

  if (!checkPasswordValid) return res.status(400).send("invalid password");

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.send(token);
};
