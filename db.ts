import mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_STRING!)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });
