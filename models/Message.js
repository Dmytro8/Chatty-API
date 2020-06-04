// import { Schema, model, Types, Document } from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const Types = mongoose.Types;
// export interface IMessage extends Document {
//   // author: string;
//   // partner: string;
//   // text: string;
//   // dialog: string;
//   // unread: boolean;
//   message_author: { type: Types.ObjectId; ref: string; required: true };
//   dialog: { type: Types.ObjectId; ref: string; required: true };
//   message_body: { type: Types.ObjectId; ref: string; required: true };
//   message_status: { type: Boolean; default: Boolean };
// }

const MessageSchema = new Schema(
  {
    message_author: { type: Types.ObjectId, ref: "User", required: true },
    dialog: { type: Types.ObjectId, ref: "Dialog", required: true },
    message_body: { type: String, required: true },
    message_status: { type: Boolean, default: false },
    // message_body: String,
    // message_status: { type: Boolean, default: false },
    // created_at: { type: Date, default: Date.now },
    // owner: { type: Types.ObjectId, ref: "User" },
    // channel_owner: { type: Types.ObjectId, ref: "Channel" },
  },
  {
    timestamps: true,
  }
);

const MessageModel = model("Message", MessageSchema);
module.exports = MessageModel;
