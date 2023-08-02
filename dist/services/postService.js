"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const post_1 = __importDefault(require("../database/models/post"));
function createPost(userId, image, caption) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Create post function called");
        try {
            const newPost = new post_1.default({
                userId: userId,
                image: image,
                caption: caption,
            });
            const savedPost = yield newPost.save();
            return savedPost;
        }
        catch (error) {
            throw new Error('Unable to create post');
        }
    });
}
exports.createPost = createPost;
// export function getUserIdFromToken(req: Request,res : Response): string | null {
//   const token = req.header('Authorization');
//   try {
//     const decoded = verifyToken(req,res);
//     return decoded.userId;
//   } catch (error) {
//     return null;
//   }
// }
// import { Request,Response} from 'express';
// import { verifyToken } from '../middleware/authMiddleware';
// import Post from '../database/models/post'; 
// export async function createPost(userId: string, image: string, caption: string): Promise<any> {
//     console.log("function called")
//   try {
//     const newPost = new Post({
//       userId: userId,
//       image: image,
//       caption: caption,
//     });
//     const savedPost = await newPost.save();
//     return savedPost;
//   } catch (error) {
//     throw new Error('Unable to create post');
//   }
// }
// export function getUserIdFromToken(req: Request,res : Response): string | null {
//   const token = req.header('Authorization');
//   try {
//     const decoded = verifyToken(req,res);
//     return decoded.userId;
//   } catch (error) {
//     return null;
//   }
// }
