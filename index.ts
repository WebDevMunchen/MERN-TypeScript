import "dotenv/config";
import "./db.js";

import express from "express";
import userRouter from "./routes/user-route.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
