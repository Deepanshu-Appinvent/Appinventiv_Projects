"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connection_1 = __importDefault(require("./database/db_connection"));
const action_1 = __importDefault(require("./database/models/action"));
const user_1 = __importDefault(require("./database/models/user"));
const followReq_1 = __importDefault(require("./database/models/followReq"));
const notification_1 = __importDefault(require("./database/models/notification"));
const post_1 = __importDefault(require("./database/models/post"));
const session_1 = __importDefault(require("./database/models/session"));
//import followRoute from './routes/followRoutes';
const followRoutes_1 = __importDefault(require("./routes/followRoutes"));
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const YAML = __importStar(require("yamljs"));
const path = __importStar(require("path"));
//import { redisConn } from './database/redis';
const ioredis_1 = require("ioredis");
const redisClient = new ioredis_1.Redis({
    host: '192.168.2.155',
    port: 6379,
});
exports.default = redisClient;
// import user from './database/models/user';
// try {
//   redisConn(); console.log('Redis connected')
// } catch (err) {
//   console.log(err);
// }
const app = (0, express_1.default)();
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(express_1.default.json());
(0, db_connection_1.default)();
app.use('/api', authRoutes_1.default);
app.use('/post', postRoute_1.default);
//app.use('/api', followRoute); 
app.use('/api', followRoutes_1.default);
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    action_1.default;
    user_1.default;
    session_1.default;
    followReq_1.default;
    notification_1.default;
    post_1.default;
});
// import express from "express";
// import mongoose from "mongoose";
// const app = express();
// app.use(express.json());
// mongoose.connect('mongodb://localhost:27017/instagram_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// } as any)
// .then(() => {
//   console.log("Connected to MongoDB");
// })
// .catch((error) => {
//   console.error("Error connecting to MongoDB:", error);
// });
// const port = 6000; // Choose the desired port number
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
