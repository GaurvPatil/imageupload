const ImageModel = require("../modules/imageSchema");
const fs = require("fs");

exports.uploads = (req, res, next) => {
  const files = req.files;

  if (!files) {
    const err = new Error("please choose files");
    res.status(400);
    return next(err);
  }

  //convert images into base64 encoded
  let imgArr = files.map((file) => {
    // first save image as buffer data
    let img = fs.readFileSync(file.path);
    return (encode_image = img.toString("base64"));
  });

let result =  imgArr.map((src, index) => {
    //create object to store data in the collection
    let finalImg = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
    };

    let newUpload = new ImageModel(finalImg);

    return newUpload
      .save()
      .then(() => {
        return {
          msg: newUpload,
        };
      })
      .catch((err) => {
        if (err) {
          // check err for duplicate image
          if (err.name === "MongoError" && err.code === 11000) {
            return Promise.reject({
              err: `Duplicate ${files[index].originalname}. file already exist`,
            });
          }
          return Promise.reject({
            err:
              err.message ||
              `Cannot Upload ${files[index].originalname} Something Missing `,
          });
        }
      });
  });

  Promise.all(result).then(msg=>{
      res.json(msg)
  }).catch(err=>{
      res.json(err)
  })
};
