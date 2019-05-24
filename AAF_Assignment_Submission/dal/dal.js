const fileheaders = require('../models/fileheader');
const imagefiles = require('../models/imagefile');
const users = require('../models/user');
const videofiles = require('../models/videofile');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/assignment`);

module.exports = {
//--Fileheaders----------------------------------------------------------------------------
    getAllByFileType: function (req, filetype){
        return fileheaders.find({file_type: filetype, team :  req.session.user.team});
    },
    countAllFiles: function (){
        return fileheaders.count({});
    },
    getFileAndUnlock: function (filename){
        if (filename != null){
            fileheaders.findOne({file_name: filename}).then(function(file){
                file.accessible = true;
                file.save();
            });
        }
    },
    getFileAndLock: function (filename){
        fileheaders.findOne({file_name: filename}).then(function(file){
            file.accessible = false;            
            file.save();
        });
    },
    getFileByName: function (filename){
        return fileheaders.findOne({file_name: filename});
    },
    searchFileByTags: function (req, search){
        return fileheaders.find({tags : { $regex : search }, team :  req.session.user.team});
    },
    newFile: function (file, res, req){
        var newFile = new fileheaders();

        newFile.file_name = file.file_name;
        newFile.file_type = file.file_type;
        newFile.created_at = file.created_at;
        newFile.last_edited = file.created_at;
        newFile.time = file.time;
        newFile.author = file.author;
        newFile.tags = file.tags;
        newFile.team = file.team;
        newFile.accessible = true;

        newFile.save();
    },
    getFileAndUpdate: function (req, filename, date, time){
        fileheaders.findOne({file_name: filename}).then(function(file){
            file.last_edited = date;
            file.time = time;
            file.tags = req.body.tags;
            file.save();
            console.log(file);
        });
    },
//--Users---------------------------------------------------------------------------
    findUserByName: function (username){
        return users.findOne({user_name: username});
    },
//--Images---------------------------------------------------------------------------
    getAllImagesByName: function (filename){
        return imagefiles.find({file_name: filename});
    },
    newImageVersion: function (image){
        var newImage = new imagefiles();

        newImage.file_version = image.file_version;
        newImage.file_name = image.file_name;
        newImage.resolution = image.resolution;
        newImage.file_type = image.file_type;
        newImage.file_format = image.file_format;
        newImage.author = image.author;
        newImage.time = image.time;
        newImage.created_at = image.created_at;

        newImage.save();
        // imagefiles.insertMany([{image}]);
    },
    countAllImageVersions: function (filename){
        return imagefiles.count({file_name: filename});
    },
    deleteImageFile: function (filename, res){
        fileheaders.deleteOne({file_name: filename}).then(function(data){});
        // res.redirect('/files/Video');
        imagefiles.deleteMany({file_name: filename}).then(function(data){
            res.redirect('/TMS/files/Image');
        });
    },
//--Videos---------------------------------------------------------------------------
    getAllVideosByName: function (filename){
        return videofiles.find({file_name: filename});
    },
    newVideoVersion: function (Video){
        var newVideo = new videofiles();
    
        newVideo.file_version = Video.file_version;
        newVideo.file_name = Video.file_name;
        newVideo.resolution = Video.resolution;
        newVideo.length = Video.length;
        newVideo.file_type = Video.file_type;
        newVideo.file_format = Video.file_format;
        newVideo.author = Video.author;
        newVideo.time = Video.time;
        newVideo.created_at = Video.created_at;
    
        newVideo.save();
    },
    countAllVideoVersions: function (filename){
        return Videofiles.count({file_name: filename});
    },
    deleteVideoFile: function (filename, res){
        fileheaders.deleteOne({file_name: filename}).then(function(data){});
        // res.redirect('/files/Video');
        videofiles.deleteMany({file_name: filename}).then(function(data){
            res.redirect('/TMS/files/Video');
        });
    },
}