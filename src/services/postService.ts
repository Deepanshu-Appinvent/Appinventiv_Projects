
import Post from '../database/models/post'; 

export async function createPost(userId: string, image: string, caption: string): Promise<any> {
    console.log("Create post function called")
  try {
    const newPost = new Post({
      userId: userId,
      image: image,
      caption: caption,
    });

    const savedPost = await newPost.save();
    return savedPost;
  } catch (error) {
    throw new Error('Unable to create post');
  }
}

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
