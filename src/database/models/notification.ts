import { Schema, Document, model } from 'mongoose';

export interface Notification extends Document {
  id: string;
  userId: string;
  ref: string; // Reference to the entity being notified about (e.g., post, comment, etc.)
  senderId: string;
  createdAt: Date;
  isRead: boolean;
}

const notificationSchema: Schema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  ref: { type: String, required: true },
  senderId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

export default model<Notification>('Notification', notificationSchema);
