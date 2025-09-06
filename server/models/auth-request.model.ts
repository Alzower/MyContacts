import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    objectId: string;
    id: string;
    email?: string;
  };
}
