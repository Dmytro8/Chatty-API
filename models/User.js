// import { Schema, model, Document } from "mongoose";
// import isEmail from "validator/lib/isEmail";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const Document = mongoose.Document;
const isEmail = require("validator/lib/isEmail");
// export interface IUser extends Document {
//   name: { type: String; required: true };
//   surname: { type: String; required: true };
//   email: { type: String; required: true };
//   username: string;
//   password: { type: String; required: true };
//   is_active: boolean;
//   confirmed: boolean;
//   confirm_hash: string;
//   last_seen: { type: Date; default: Date };
// }

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "Invalid email"],
      unique: true,
    },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    confirm_hash: { type: String },
    last_seen: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
