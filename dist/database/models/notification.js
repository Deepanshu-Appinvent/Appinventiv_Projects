"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    ref: { type: String, required: true },
    senderId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
});
exports.default = (0, mongoose_1.model)('Notification', notificationSchema);
