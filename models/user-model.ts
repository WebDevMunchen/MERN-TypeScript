import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  // classesRegistered: { type: Schema.Types.ObjectId, ref: "Classe" }
});

const User = model("User", userSchema);

export default User; 
