import express from "express";
import dotenv from "dotenv";
import { authMiddleWare } from "./middleware/auth.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger.ts";
import authRouter from "./routes/auth.ts";
import contactsRouter from "./routes/contacts.ts";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRouter);
app.use("/contacts", authMiddleWare, contactsRouter);

export default app;
