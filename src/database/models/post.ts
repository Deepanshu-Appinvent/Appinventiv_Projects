
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Post extends Document {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  image: string;
  caption: string;
}

const postSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  caption: { type: String, required: true },
});

export default mongoose.model<Post>('Post', postSchema);
