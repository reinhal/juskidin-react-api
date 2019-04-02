'use strict';

const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
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
    url: {
      type: String
    }, 
    id: {
      type: String
    }
  }
})

module.exports = mongoose.model('Image', ImageSchema);