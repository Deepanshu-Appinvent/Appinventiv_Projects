import UserCollection from '../database/models/user';
import bcrypt from 'bcrypt';
import {generateToken} from '../middleware/authMiddleware';

export async function login_service(email: string, password: string): Promise<any> {
  try {
    const user = await UserCollection.findOne({ email: email });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = generateToken({userId: user._id});
    return{token, user};
    return user;

  } catch (error) {
    console.log(error);
    throw new Error('Login failed');
  }
}