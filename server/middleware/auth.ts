import { NextFunction, Response } from "express";
import { AuthRequest } from "../models/auth-request.model";
import jwt from "jsonwebtoken";

export const authMiddleWare = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) res.status(404).send("token not found");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};
