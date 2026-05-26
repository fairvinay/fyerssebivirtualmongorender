//import { connect } from "mongoose";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Local Database
//const url = "mongodb://localhost:27017/wall-street"

// Mlab Database
// const url = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds225308.mlab.com:25308/wall-street`
 const url = process.env.MONGOWALLSTREETURL
 //`mongodb+srv://fairvinay:${process.env.PASSWORD}@cluster0.9ke4d.mongodb.net/wall-street?retryWrites=true&w=majority`

 /*
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log("Connected to DB")
})


// Modern Mongoose handles everything for you!
connect(url)
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas successfully");
    })
    .catch((err) => {
        console.error("❌ Database connection error:", err);
    });
*/
if (!url) {
  console.error("❌ MONGOWALLSTREETURL missing");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(url, {
  bufferCommands: false,
  serverSelectionTimeoutMS: 8000,
  socketTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  maxPoolSize: 5,
    });
  }

  try {
    cached.conn = await cached.promise;

    console.log("✅ Connected to MongoDB Atlas successfully");

    return cached.conn;
  } catch (err) {
    cached.promise = null;

    console.error("❌ MongoDB connection error:", err);

    throw err;
  }
}
export {mongoose };
export default    mongoose ;
