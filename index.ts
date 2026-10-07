import "dotenv/config";
import "./db";

import express from "express";
import cors from "cors";

const port = Number(process.env.PORT) || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
