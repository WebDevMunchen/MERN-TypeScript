import "dotenv/config";
import "./db";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user-route";
import { errorHandler } from "./middlewares/errorHandler";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/user", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
