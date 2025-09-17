import { Request, Response } from "express";
import { findUserByEmail } from "../helper/user-helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await findUserByEmail(email);

  if (!user) return res.status(404).json({ error: "User not found" });

  const checkPasswordValid = await bcrypt.compare(password, user.password);
  if (!checkPasswordValid) return res.status(400).json({ error: "Invalid password" });

  try {
    const token = jwt.sign(
      { email: user.email, id: user.id, objectId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(200).json({jwt_token: token });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
