import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import jwt  from "jsonwebtoken";

import { registerationvalidation, loginvalidation} from "../validation.js";
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
     
    const {error} = registerationvalidation(req.body);
    
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    let existingUser;
     
    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists" })
    }
    const hashPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password : hashPassword,
        role: "user",
        blogs: []
    });
   
    
    try {
        user.save()
    } catch (err) {
       console.log(err);
    }

    return res.status(201).json(user);
}


export const login = async (req, res, next) => {
       const {email, password} = req.body;
       const {error} = loginvalidation(req.body);
      
       if(error){
          return res.status(400).json({message: error.details[0].message});
       }
      let existinguser;
      
      
      try{
        existinguser = await User.findOne({email});
      }catch{
        return console.log(err);
      }
      if (!existinguser) {
        return res.status(404).json({message: "User Can Not Be Found"})
      }

      const isPasswordCorrect = bcrypt.compareSync(password, existinguser.password);

      if(!isPasswordCorrect){
        return res.status(404).json({message: "Incorrect password"})
      }

      let payload = { id: existinguser.id, user_type: existinguser.role };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET);
      
      return res.status(200).json({message: "Login Successful",token: token})

}