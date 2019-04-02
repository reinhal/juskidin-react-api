'use strict';

require('dotenv').config();

const express = require('express');
const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const Image = require('./model');
const router = express.Router();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });
  
  const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "juskidin",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
  
  const parser = multer({ storage: storage });
  
  router.post('/api/images', parser.single('image'), (req, res) => {
    console.log(req.file);
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    
    Image.create(image)
        .then(newImage => res.json(newImage))
        .catch(err => console.log(err));
  });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         // rejects storing a file
//         cb(null, false);
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });

// ImageUploadRouter.route('/uploads')
//     .post(upload.single('imageUploadForm'), (req, res, next) => {
//         console.log(req.body);
//         const newImageUpload = new ImageUpload ({
//             title: req.body.title,
//             notes: req.body.notes,
//             album: req.body.album,
//             image: req.file.path
//         });

//         newImageUpload.save() 
//             .then((result) => {
//                 console.log(result);
//                 res.status(200).json({
//                     success: true,
//                     document: result
//                 });
//             })
//             .catch((err) => next(err));
//     });

module.exports = {router};