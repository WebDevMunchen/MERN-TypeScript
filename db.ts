import mongoose from "mongoose";

mongoose
  .connect(process.env.CONNECTION_STRING as string)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log(error);
  });
