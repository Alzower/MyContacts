import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { registerController } from "./controllers/registerController.ts";
import { loginController } from "./controllers/LoginController.ts";
import { authMiddleWare } from "./middleware/auth.ts";

const port = 3000;


const app = express();
app.use(express.json());

dotenv.config();


const mongoPath = process.env.MongoPath;
if (!mongoPath) throw new Error("Mongo Path is undefined");

try {
mongoose
  .connect(mongoPath)
  .then(() => {
    console.log("DB is Connected");
    app.listen(port, () => {
      console.log("Server Listening on PORT:", port);
    })
  })
} catch (error) {
  console.log("DB Connection Error", error);
}


app.post("/auth/register", registerController);
app.post("/auth/login", loginController);

app.post("/contacts", authMiddleWare);
