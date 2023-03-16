import Jwt  from "jsonwebtoken";

export const verifyUserToken = (req, res, next) => {

    let token = req.headers['authorization'];
    if(!token){

        return res.status(401).json({message: "Unauthorized equest"});
    }

    try{

        token = token.split(' ')[1];
      
        if(token === 'null' || !token){
            return res.status(401).json({message: "Unauthorized request"});
        }
const verifieduser = Jwt.verify(token, process.env.TOKEN_SECRET);
if(!verifieduser){
return res.status(401).json({message: "Unauthorized request"});
}
req.user = verifieduser;
next();
    } catch{
     res.status(400).send('Invalid Token');
    }
}

export const IsUser = async (req, res, next) => {
    try{
        let checkuser = req.user.user_type;
        if(checkuser == "user"){
           next();
        }else{
            return res.status(401).json({message: "Unauthorized request"});
        }
    }catch{
        return res.status(401).json({message: "sad request"});
    }
}

export const IsAdmin= async (req, res, next) => {

    try{
        let checkuser = req.user.user_type;
        if(checkuser == "admin"){
            next();
        }
        else{
            return res.status(401).json({message: "Unauthorized request"});
        }
    }catch{
        return res.status(401).json({message: "Unauthorized request"});
    }
  

}