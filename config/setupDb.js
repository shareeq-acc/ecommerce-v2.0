import mongoose from "mongoose";
import keys from "./keys.js";
const { database } = keys;

const connectDb = () => {
  mongoose
    .connect(database.url)
    .then(() => console.log("Connected to the Database"))
    .catch((error) =>
      console.log(
        "Failed to Connect to the Database \n Error: \n",
        error.message
      )
    );
};

export default connectDb;
