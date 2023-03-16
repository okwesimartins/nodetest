import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import bodyParser from "body-parser";

import multer from 'multer';
dotenv.config();
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.set('strictQuery', false);

    mongoose.connect(`mongodb+srv://martin:${ process.env.DB_PASSWORD}@mycluster.b4a3mnh.mongodb.net/?retryWrites=true&w=majority`
).then(() => app.listen(5000)).then(() => console.log("connected")).catch((err) => console.log(err));



