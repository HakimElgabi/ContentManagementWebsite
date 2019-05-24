"use strict"

const mongoose = require('mongoose');

var videofile = new mongoose.Schema({
  file_version:{
    type: Number,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_type: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  time:{
    type: String,
    required: true,
  },  
  author:{
    type: String,
    required: true,
  },
  resolution:{
    type: String,
    required: true,
  },
  length:{
    type:String,
    required: true,
  },
  file_format:{
    type: String,
    required: true,
  }
});

var videofiles = mongoose.model('videofile', videofile);
module.exports = videofiles;