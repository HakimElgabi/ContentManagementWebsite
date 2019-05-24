"use strict"

const mongoose = require('mongoose');

var fileheader = new mongoose.Schema({
  file_name: {
    type: String,
    unique: true,
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
  last_edited:{
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
  tags:{
    type: String,
  },
  team: {
    type: String,
    required: true,
  },
  accessible: {
    type: Boolean,
    required: true,
  }
});

var fileheaders = mongoose.model('fileheader', fileheader);
module.exports = fileheaders;