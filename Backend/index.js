import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./route/userRoute.js";
import adminRoute from "./route/adminRoute.js";
const app = express();
import path from 'path';
app.use(cors());
app.use(express.json());
const _dirname=path.dirname("");
const buildpath = path.join(_dirname,"../Frontend/dist");
app.use(express.static(buildpath));
dotenv.config();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURL;

// Connect to MONGODB

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error: ", error);
}

// defining Routes

app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
