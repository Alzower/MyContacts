import { Request } from "express";

export interface User {
  objectId: string;
  id: string;
  email?: string;
}
export interface AuthRequest extends Request {
  user?: User;
}
