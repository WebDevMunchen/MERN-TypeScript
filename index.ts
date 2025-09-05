import "dotenv/config";
import "./db";

import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user-route";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
