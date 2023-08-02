import UserCollection from "../database/models/user";
import bcrypt from "bcrypt";
export async function signup_service(
  name: string,
  username: string,
  email: string,
  password: string,
  bio: string,
  profilePicture: string
): Promise<any> {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserCollection.create({
      email: email,
      password: hashedPassword,
      name: name,
      username: username,
      bio: bio,
      profilePicture: profilePicture,
    });
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred during signup");
  }
}

module.exports = {
  signup_service,
};

// import bcrypt from 'bcrypt';
// import  User from '../database/models/user';

// export class SignupService {
//   async createUser(username: string, password: string) {
//     try {
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         throw new Error('Username already exists');
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({
//         name: {
//           username,
//           firstName: '',
//           lastName: '',
//         },
//         email: '', // You may add email field if it's included in the signup request
//         password: hashedPassword,
//       });

//       const savedUser = await newUser.save();
//       return savedUser;
//     } catch (error) {
//       throw new Error();
//     }
//   }
// }
