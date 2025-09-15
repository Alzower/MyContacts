import mongoose from "mongoose";
import app from "./app";

const port = 3000;
const mongoPath = process.env.MONGO_PATH;
if (!mongoPath) throw new Error("Mongo Path is undefined");

try {
  mongoose.connect(mongoPath).then(() => {
    console.log("DB is Connected");
    app.listen(port, () => {
      console.log("Server Listening on PORT:", port);
    });
  });
} catch (error) {
  console.log("DB Connection Error", error);
}
