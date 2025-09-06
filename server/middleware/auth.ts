import { NextFunction, Response } from "express";
import { AuthRequest, User } from "../models/auth-request.model";
import jwt from "jsonwebtoken";

export const authMiddleWare = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.header("Authorization");
  if (!header) return res.status(404).send("Authorization header not found");
  const token = header.replace("Bearer ", "");
  if (!token) res.status(404).send("token not found");
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }
    req.user = jwt.verify(token, process.env.JWT_SECRET) as unknown as User;
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};
