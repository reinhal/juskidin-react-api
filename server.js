'use strict';

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const formData = require('express-form-data');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config');

const app = express();

app.use(cors({ 
  origin: CLIENT_ORIGIN 
}))

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  }, 
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
}) 

app.post('/image-upload', (req, res, next) => {
  const upload = multer({ storage }).single('name-of-input-key')
  console.log(req);
  upload(req, res, function(err) {
    if(err) {
      return res.send(err)
    }
    console.log('file uploaded to server')
    console.log(req.file)

    cloudinary.config({ 
      cloud_name: process.env.CLOUD_NAME, 
      api_key: process.env.API_KEY, 
      api_secret: process.env.API_SECRET
    })

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `juskidin/${uniqueFilename}` },
      function(err, image) {
        if (err) return res.send(err);
        console.log('file uploaded to Cloudinary')
        // remove file from server
        const fs = require('fs')
        fs.unlinkSync(path)
        res.json(image);
      }
    )
  })
});



  
 

// app.use(formData.parse())

// app.post('/image-upload', (req, res) => {

//   const values = Object.values(req.files)
//   const promises = values.map(uploadedImage => cloudinary.uploader.upload(uploadedImage.path))
  
//   Promise
//     .all(promises)
//     .then(results => res.json(results))
//     .catch((err) => res.status(400).json(err))
// })

app.listen(process.env.PORT || 8080, () => console.log('👍'))