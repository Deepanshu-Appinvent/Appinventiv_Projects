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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostController = void 0;
const postService_1 = require("../services/postService");
function createPostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uid = req.body.userId;
            const { image, caption } = req.body;
            const savedPost = yield (0, postService_1.createPost)(uid, image, caption);
            res.status(201).json({
                message: "Post created successfully",
                post: savedPost,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Unable to create post",
            });
        }
    });
}
exports.createPostController = createPostController;
