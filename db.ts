import mongoose from "mongoose";

const connectionString = process.env.CONNECTION_STRING as string;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });

export default mongoose;