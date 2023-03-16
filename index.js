import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import bodyParser from "body-parser";


dotenv.config();
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.set('strictQuery', false);

    mongoose.connect(process.env.MONGO_URI
).then(() => app.listen(5000)).then(() => console.log("connected")).catch((err) => console.log(err));



