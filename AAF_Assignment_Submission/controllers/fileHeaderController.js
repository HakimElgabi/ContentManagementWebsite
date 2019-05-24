const dal = require('../dal/dal');

// Show 
exports.showFiles = function(req, res) {
    const filetype = req.params.file_type;
    if (!req.session.user){
        req.flash('errors', {
            msg: "You need to sign in to to view this page!"
          });        
        res.redirect('../TMS/signin');
    }
    else {
        // Get the current file the user is on
        var currentFile = req.session.user.currentFile;
        // Unlock that File so it's accessible by other users
        dal.getFileAndUnlock(currentFile);
        // Reset the users current file to null
        req.session.user.currentFile = null;
        // Retrieve All Files
        dal.getAllByFileType(req, filetype).exec(function(err, data){
            if (err == null){
                return res.status(200).render('files',{ title: filetype, fileheaders : data, user: req.session.user});
            }
            else if (err){
                console.log(err);
                return res.status(500).redirect('../TMS/signin');
            }
        });
    }
};

exports.searchFiles = function(req, res) {
    // Retrieve the string from the Search bar
    var search = req.query.search;

    // Check User session is set
    if (!req.session.user){
        // Redirect to sign in page with Error Message
        req.flash('errors', {
            msg: "You need to sign in to to view this page!"
          });
        res.redirect('../TMS/signin');
    }
    else {
        // If successful then render homepage
        dal.searchFileByTags(req, search).then(function(data){
            res.render('files',{title:'Search ' + search, fileheaders : data, user: req.session.user});
        });
    }
}

exports.renderNewFilePage = function(req, res) {
    // Render Page
    res.render('newFile', { title: 'Create New File' });
};

exports.renderNewVideoFilePage = function(req, res) {
    // Render page
    res.render('newVideoFile', { title: 'Create New File' });
};