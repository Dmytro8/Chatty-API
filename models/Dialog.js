// import { Schema, model, Document, Types } from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const Types = mongoose.Types;
// export interface IDialog extends Document {
//   // topic: string;
//   // users: Array<IUser>;
//   owner: { type: Types.ObjectId; ref: string; required: true };
//   partner: { type: Types.ObjectId; ref: string; required: true };
//   // messages: Array<IMessage>;
//   lastMessage: { type: Types.ObjectId; ref: string };
//   // lastMessage: string;
// }

const DialogSchema = new Schema(
  {
    // name: { type: String, lowercase: true, unique: true },
    // topic: String,
    // users: [{ type: Types.ObjectId, ref: "User" }],
    owner: { type: Types.ObjectId, ref: "User", required: true },
    partner: { type: Types.ObjectId, ref: "User", required: true },
    // messages: [{ type: Types.ObjectId, ref: "Message" }],
    lastMessage: { type: Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const DialogModel = model("Dialog", DialogSchema);
module.exports = DialogModel;
