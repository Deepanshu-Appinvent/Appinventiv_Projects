import mongoose, { connect } from "mongoose";


function connects() {
  return mongoose
    .connect("mongodb://192.168.2.155:27017/instagram_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

export default connects;
