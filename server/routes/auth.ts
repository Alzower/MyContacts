import express from "express";
import { registerController } from "../controllers/registerController";
import { loginController } from "../controllers/LoginController";

const authRouter = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
authRouter.post("/register", registerController);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 */
authRouter.post("/login", loginController);

export default authRouter;
