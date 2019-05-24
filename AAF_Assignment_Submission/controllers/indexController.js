"use strict"

// Render the homepage
exports.renderHomepage = function(req, res) {
    if (!req.session.user){
        req.flash('errors', {
            msg: "You need to sign in to to view this page!"
          });
        res.redirect('../TMS/signin');
    }
    else {
        res.render('index', { title: 'HomePage' , user: req.session.user});
    }
};
