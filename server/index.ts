import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { registerController } from "./controllers/registerController.ts";

const app = express();
app.use(express.json());
const port = 3000;

dotenv.config();
const mongoPath = process.env.MongoPath;
if (!mongoPath) throw new Error("Mongo Path is undefined");
mongoose
  .connect(mongoPath)
  .then(() => {
    console.log("DB is Connected");
    app.listen(port, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((error) => console.error(error));

app.post("/auth/register", registerController);
