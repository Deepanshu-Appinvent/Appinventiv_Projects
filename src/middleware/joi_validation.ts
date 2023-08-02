import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const signUpSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    bio: Joi.string(),
    profilePicture: Joi.string(),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// const followSchema = Joi.object({
//     senderId: Joi.string().required(),
//     receiverId: Joi.string().required(),
//     status: Joi.string().required(),
//     created_at: Joi.date().default(Date.now),
//     updated_at: Joi.date().default(Date.now),

// });


export const joi_signup = (req: Request, res: Response, next: NextFunction) => {
    const { error } = signUpSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const joi_login = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};



// export const joi_follow = (req: Request, res: Response, next: NextFunction) => {
//     const { error } = followSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//     }
//     next();
// };