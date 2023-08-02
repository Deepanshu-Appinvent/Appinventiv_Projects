import mongoose, { Schema, Document, Types } from "mongoose";
import db from '../db_connection';

export interface Session extends Document {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    expires: "1h", 
  }
);

export default mongoose.model<Session>("Session", sessionSchema);
