const dal = require('../dal/dal');

exports.showVideoFiles = function(req, res) {
    if (!req.session.user){
        req.flash('errors', {
            msg: "You need to sign in to to view this page!"
          });
        res.redirect('../TMS/signin');
    }
    else {
        var filename = req.params.file_name;
        dal.getFileAndLock(filename);
        dal.getFileByName(filename).then(function(data){
            console.log("Test 1");
            req.session.user.currentFile = data.file_name;
            console.log(req.session.user);
        });
        dal.getAllVideosByName(filename).then(function(data){
            res.render('videoFiles',{ title: filename , videofiles : data});
        });
    }
};

exports.newVideoFile = function(req, res) {
    var today = new Date();
    var minutes;
    if (today.getMinutes() >= 0 && today.getMinutes() <= 9){
        minutes = '0' + today.getMinutes().toString();
    }
    else
        minutes = today.getMinutes().toString();

    var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
    var time = today.getHours() + ':' + minutes;  
    
    var videoData = {
        "file_version": 1,
        "file_name": req.body.file_name,
        "resolution": req.body.resolution,
        "file_type": "Video",
        "length": req.body.minutes,
        "author": req.session.user.user_name,
        "file_format": req.body.file_format,
        "tags": req.body.tags,
        "time": time,
        "created_at": date,
        "team":req.session.user.team };
    
    var fileData = {
        "file_name" : req.body.file_name,
        "file_type" : "Video",
        "created_at" : date,
        "last_edited" : date,
        "time" : time,
        "author" : req.session.user.user_name,
        "tags" : req.body.tags,
        "team" : req.session.user.team,
        "accessible" :  true }
    
    dal.newFile(fileData);
    dal.getFileByName(req.body.file_name).then(function(data){
        // If a doesn't exist then it will create the file
        if (!data){
            dal.newFile(fileData);
            dal.newVideoVersion(videoData);
            if (req.body.tags == "POSTMAN"){
                res.json(fileData);
            }
            else{
                return res.redirect('/TMS/files/VIdeo');
            }
        }
        // If a file does exist then it will not create and return an error
        else if (data){
            req.flash('errors', {
                msg: "Project Already Started"
              });
            return res.status(500).redirect('/TMS/files/Video');
        }
    });

    return res.redirect('/TMS/files/Video');
};

exports.RenderNewVideoVersion = function(req, res) {
    var filename = req.params.file_name;
    dal.getFileByName(filename).then(function(data){
        res.render('newVideoVersion',{ file_name: filename , fileheaders : data});
    });
}

exports.newVideoVersion = function(req, res) {
    var today = new Date();
    var minutes;
    if (today.getMinutes() >= 0 && today.getMinutes() <= 9){
        minutes = '0' + today.getMinutes().toString();
    }
    else
        minutes = today.getMinutes().toString();
    var date = today.getDate().toString() + '/' + (today.getMonth()+1).toString() + '/' + today.getFullYear();
    var time = today.getHours() + ':' + minutes;    
    
    var filename = req.body.filename;

    dal.countAllImageVersions(filename).then(function(result){
        console.log(result);

        var videoData = {
            "file_version": result +1,
            "file_name": req.body.filename,
            "resolution": req.body.resolution,
            "file_type": "Video",
            "author": req.session.user.user_name,
            "length": req.body.minutes,
            "file_format": req.body.file_format,
            "tags": req.body.tags,
            "time": time,
            "created_at": date,
            "team":req.session.user.team };
    
        dal.newVideoVersion(videoData);
    });

    dal.getFileAndUpdate(req, filename, date, time);
    return res.redirect('/TMS/files/Video/'+filename); 
}

exports.deleteVideo = function(req, res) {
    filename = req.params.file_name;
    dal.deleteVideoFile(filename, res);
}

exports.renderConfimDelete = function(req, res) {
    filename = req.params.file_name;
    dal.getFileByName(filename).then(function(data){
        res.render('deleteConfirm',{ title: filename, file_type:data.file_type});
    });
}