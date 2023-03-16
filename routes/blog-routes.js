import express from "express";

import { getAllBlogs,getByUserId, addBlog, updateBlog, getById,updateBlogImage,deleteBlog} from "../controllers/blog-controller.js";
import { verifyUserToken, IsAdmin, IsUser } from '../middleware/auth.js';
import {uploadFile} from "../middleware/blog.js";


// const Storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//      cb(null, './uploads/');
//     },
//     filename: (req, file, cb)=>{
//      cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: Storage })

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

blogRouter.post("/add", verifyUserToken,IsUser,uploadFile,addBlog);

blogRouter.put("/update:id", updateBlog);

blogRouter.get("/update_blog_image/:id",verifyUserToken,IsUser,updateBlogImage);

blogRouter.get("/:id", getById);

blogRouter.delete("/:id", deleteBlog);

blogRouter.get("/user/:id", getByUserId);

export default blogRouter;