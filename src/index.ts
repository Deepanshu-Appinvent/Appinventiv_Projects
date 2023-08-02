import express from 'express';
import connectDB from './database/db_connection';
import  actionRequest from './database/models/action';
import  userRequest from './database/models/user';
import  followRequest from './database/models/followReq';
import  notification from './database/models/notification';
import  post from './database/models/post';
import  sessionRequest from './database/models/session';
//import followRoute from './routes/followRoutes';
import followRequestRoutes from './routes/followRoutes';

import route from './routes/postRoute';
import authRoutes from './routes/authRoutes';
import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as path from 'path';
//import { redisConn } from './database/redis';

import { Redis } from 'ioredis';

const redisClient = new Redis({
  host: '192.168.2.155',
  port: 6379,
});

export default redisClient;


// import user from './database/models/user';

// try {
//   redisConn(); console.log('Redis connected')
// } catch (err) {
//   console.log(err);
// }

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml')); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
connectDB();
app.use('/api', authRoutes); 
app.use('/post',route );
//app.use('/api', followRoute); 
app.use('/api', followRequestRoutes);


const PORT = 4000 ;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  actionRequest;
  userRequest;
  sessionRequest;
  followRequest;
  notification;
  post;
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
