import { Request, Response } from "express";
export const authMiddleWare = (req: Request, res: Response) => {
  const jwt = require("jsonwebtoken");
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) res.status(404).send("token not found");
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(400).send(error);
  }
};
