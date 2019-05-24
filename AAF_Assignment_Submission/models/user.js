"use strict"

const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

var user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  currentFile:{
    type: String,
    required: true
  }
});

var users = mongoose.model('user', user);
module.exports = users;