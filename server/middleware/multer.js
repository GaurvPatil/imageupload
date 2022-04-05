const multer = require("multer");


// storage
const Storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: function(req,file, cb){
        let ext = file.originalname.substring(file.originalname.lastIndexOf("."))
        cb(null , file.fieldname + "_" + Date.now() + ext)
    }
  });

  module.exports =  store = multer({storage: Storage})
 
  
  
  

  
  