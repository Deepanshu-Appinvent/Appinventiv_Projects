import { Request, Response } from "express";
import { createPost } from "../services/postService";
import user from "../database/models/user";
export async function createPostController(req: Request, res: Response) {
  try {
 
    const uid = req.body.userId;
    const { image, caption } = req.body;
  

    const savedPost = await createPost(uid, image, caption);

    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create post",
    });
  }
}
