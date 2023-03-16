import multer from 'multer';

const fileFilter = (req, file, cb) => {
    if(file.mimetype =="image/jpeg"){
        cb(null, true);
    }else{
        cb(new Error('Invalid File type'), false);
    }
}



const Storage = multer.diskStorage({
    destination: (req, file, cb)=>{
     cb(null, './uploads/');
    },
    filename: (req, file, cb)=>{
     cb(null, Date.now() + file.originalname);
    }
});

   



 const uploadBlog = multer({ storage: Storage ,
 limits:{
    fileSize: 1024 * 1024 * 5
 },
 fileFilter: fileFilter
}).single('testimage');

 export const uploadFile = (req, res, next) => {
 
 uploadBlog(req, res, function(err){
    if(err){
        return res.status(400).json({message : err.message})
    }

    next();
} )};
 
