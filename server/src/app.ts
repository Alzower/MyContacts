import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authMiddleWare } from "./middleware/auth";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger";
import authRouter from "./routes/auth";
import contactsRouter from "./routes/contacts";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRouter);

app.use("/contacts", authMiddleWare, contactsRouter);

export default app;
