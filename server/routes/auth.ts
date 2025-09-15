import express from "express";
import { registerController } from "../controllers/registerController";
import { loginController } from "../controllers/LoginController";

const authRouter = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: User's email address
 *             password:
 *               type: string
 *               format: password
 *               description: User's password
 */

authRouter.post("/register", registerController);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: User's email address
 *             password:
 *               type: string
 *               format: password
 *               description: User's password
 */
authRouter.post("/login", loginController);

export default authRouter;
