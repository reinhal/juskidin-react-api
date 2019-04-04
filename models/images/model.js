'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  imageName: {
    type: String,
    default: 'none',
    required: true
  },
  imageData: {
    type: String,
    required: true
  }
})

// const ImageSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   title: {
//     type: String,
//     default: "none",
//     required: true
//   }, 
//   notes: {
//     type: String
//   },
//   album: {
//     type: String
//   },
//   tags: [{
//     type: String
//   }],
//   image: {
//     url: {
//       type: String
//     }, 
//     id: {
//       type: String
//     }
//   }
// })

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;