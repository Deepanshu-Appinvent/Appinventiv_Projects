"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connects() {
    return mongoose_1.default.connect('mongodb://192.168.2.155:27017/instagram_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
        console.log("Connected to MongoDB");
    })
        .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
}
exports.default = connects;
