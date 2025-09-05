import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { registerModel } from "./models/register.model.ts";

const app = express();
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

app.get("/", (req, res) => {
  mongoose
    .model("user", registerModel)
    .create({
      email: "tesdsfsdfsdt",
      Name: "flksdnflsdnflksd,fc",
    })
    .then(() => res.send("ahhhhhhh"))
    .catch((error) => console.log(error));
});
