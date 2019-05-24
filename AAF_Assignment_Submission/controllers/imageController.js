const dal = require('../dal/dal');


exports.showImageFiles = function(req, res) {
    // If User session is not set the  return to page
    if (!req.session.user){
        req.flash('errors', {
            msg: "You need to sign in to to view this page!"
          });
        res.redirect('../TMS/signin');
    }
    else {
        // Set the file the user is currently using
        var filename = req.params.file_name;
        // Find a lock file so other users can't access it
        dal.getFileAndLock(filename);
        dal.getFileByName(filename).then(function(data){
            req.session.user.currentFile = data.file_name;
        });
        // Fetch All Images for that File header name
        dal.getAllImagesByName(filename).then(function(data){
            res.render('imageFiles',{ title: filename , imagefiles : data});
        });
    }
};

exports.newImageFile = function(req, res) {
    // Set the date
    var today = new Date();
    var minutes;
    if (today.getMinutes() >= 0 && today.getMinutes() <= 9){
        minutes = '0' + today.getMinutes().toString();
    }
    else
        minutes = today.getMinutes().toString();

    
    var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
    var time = today.getHours() + ':' + minutes;  

    // Set the data to be inserted into the database
    var imageData = {
        "file_version": 1,
        "file_name": req.body.file_name,
        "resolution": req.body.resolution,
        "file_type": "Image",
        "author": req.session.user.user_name,
        "file_format": req.body.file_format,
        "tags": req.body.tags,
        "time": time,
        "created_at": date,
        "team":req.session.user.team };

    // Set the data to be inserted into the database
    var fileData = {
        "file_name" : req.body.file_name,
        "file_type" : "Image",
        "created_at" : date,
        "last_edited" : date,
        "time" : time,
        "author" : req.session.user.user_name,
        "tags" : req.body.tags,
        "team" : req.session.user.team,
        "accessible" :  true }

    // Attempt to retrieve a file with the same name
    dal.getFileByName(req.body.file_name).then(function(data){
        // If a doesn't exist then it will create the file
        if (!data){
            dal.newFile(fileData, res, req);
            dal.newImageVersion(imageData);
            if (req.body.tags == "POSTMAN"){
                res.json(fileData);
            }
            else{
                return res.redirect('/TMS/files/Image');
            }
        }
        // If a file does exist then it will not create and return an error
        else if (data){
            req.flash('errors', {
                msg: "Project Already Started"
              });
            return res.status(500).redirect('/TMS/files/Image');
        }
    });
};

exports.RenderNewImageVersion = function(req, res) {
    // Render the new Version page
    var filename = req.params.file_name;
    dal.getFileByName(filename).then(function(data){
        res.render('newVersion',{ file_name: filename , fileheaders : data});
    });
}

exports.newImageVersion = function(req, res) {
    var today = new Date();
    var minutes;
    if (today.getMinutes() >= 0 && today.getMinutes() <= 9){
        minutes = '0' + today.getMinutes().toString();
    }
    else
        minutes = today.getMinutes().toString();
    
    var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
    var time = today.getHours() + ':' + minutes;  

    var filename = req.body.filename;

    dal.countAllImageVersions(filename).then(function(result){
        console.log(result);

        // Set the data for creating a new version and updating the header file
        var imageData = {
            "file_version": result +1,
            "file_name": req.body.filename,
            "resolution": req.body.resolution,
            "file_type": "Image",
            "author": req.session.user.user_name,
            "file_format": req.body.file_format,
            "tags": req.body.tags,
            "time": time,
            "created_at": date,
            "team":req.session.user.team };
    
        dal.newImageVersion(imageData);
    });

    // Call DAL and update file
    dal.getFileAndUpdate(req, filename, date, time);

    return res.redirect('/TMS/files/Image/'+filename); 
}

exports.deleteImage = function(req, res) {
    // Get filename from Parameter and delete file
    filename = req.params.file_name;
    dal.deleteImageFile(filename, res);
}

exports.renderConfimDelete = function(req, res) {
    // Render the confirm delete page
    filename = req.params.file_name;
    dal.getFileByName(filename).then(function(data){
        console.log(data);
        res.render('deleteConfirm',{ title: filename, file:data});
    });
}