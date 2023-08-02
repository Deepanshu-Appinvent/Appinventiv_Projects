"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const followRequestSchema = new mongoose_1.Schema({
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    privacy: { type: Boolean, default: true },
});
followRequestSchema.virtual('statusDisplay').get(function () {
    if (this.privacy) {
        return 'accepted';
    }
    else {
        return this.status;
    }
});
exports.default = (0, mongoose_1.model)('FollowRequest', followRequestSchema);
