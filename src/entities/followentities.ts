// import { Schema, Document, model } from 'mongoose';

// export interface IFollowRequest extends Document {
//   senderId: string;
//   receiverId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   status: 'pending' | 'accepted' | 'rejected';
//   privacy: boolean;
// }

// const followRequestSchema: Schema = new Schema({
//   senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected'],
//     default: 'pending',
//   },
//   privacy: { type: Boolean, default: true },
// });

// followRequestSchema.virtual('statusDisplay').get(function (this: IFollowRequest) {
//   if (this.privacy) {
//     return 'accepted';
//   } else {
//     return this.status;
//   }
// });

// const FollowRequestModel = model<IFollowRequest>('FollowRequest', followRequestSchema);
// export default FollowRequestModel;
