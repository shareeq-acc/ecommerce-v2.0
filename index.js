import "dotenv/config.js";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";

import errorMiddleware from "./middlewares/errorMiddleware.js";
import routes from "./routes/index.js";
import keys from "./config/keys.js";
import connectDb from "./config/setupDb.js";

const { port } = keys;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

connectDb();
app.use("/api", routes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
