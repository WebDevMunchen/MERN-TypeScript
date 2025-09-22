import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  // classesRegistered: { type: Schema.Types.ObjectId, ref: "Classe" }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

userSchema.pre("findOne", function (next) {
  const query = this.getQuery();

  if (query.email) {
    query.email = query.email.toLowerCase();
  }

  next();
});

const User = model("User", userSchema);

export default User;
