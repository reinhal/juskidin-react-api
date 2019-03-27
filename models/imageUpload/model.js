'use strict';

const mongoose = require('mongoose');

const uploadPhotoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: "none",
    required: true
  }, 
  notes: {
    type: String
  },
  tags: [{
    type: String
  }],
  image: {
    type: String, 
    required: true
  }
})

module.exports = mongoose.model('uploadImage', uploadPhotoSchema);