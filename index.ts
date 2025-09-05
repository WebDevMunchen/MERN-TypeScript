import "dotenv/config";
import "./db";

import express = require("express");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
