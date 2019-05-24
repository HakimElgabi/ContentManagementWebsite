"use strict"

const express = require('express');
const fileHeaderController = require('../controllers/fileHeaderController');
const imageController = require('../controllers/imageController');
const videoController = require('../controllers/videoController');
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', indexController.renderHomepage);

router.get('/signout', userController.SignOut);

router.get('/files/:file_type', fileHeaderController.showFiles);

router.get('/files', fileHeaderController.searchFiles)

router.get('/newFile', fileHeaderController.renderNewFilePage);

router.get('/newVideoFile', fileHeaderController.renderNewVideoFilePage);

router.get('/files/Image/:file_name', imageController.showImageFiles);

router.get('/files/Video/:file_name', videoController.showVideoFiles);

router.post('/newImage', imageController.newImageFile);

router.post('/newVideo', videoController.newVideoFile);

router.get('/signin', userController.renderSignInPage);

router.get('/files/Image/:file_name/newVersion', imageController.RenderNewImageVersion)

router.get('/files/Video/:file_name/newVersion', videoController.RenderNewVideoVersion)

router.get('/files/Video/confirmDelete/:file_name', videoController.renderConfimDelete)

router.get('/files/Image/confirmDelete/:file_name', imageController.renderConfimDelete)

router.get('/files/Video/delete/:file_name', videoController.deleteVideo)

router.get('/files/Image/delete/:file_name', imageController.deleteImage)

router.post('/newImageVersion', imageController.newImageVersion)

router.post('/newVideoVersion', videoController.newVideoVersion)

router.post('/checkSignIn', userController.SignIn);

module.exports = router;