"use strict"

const dal = require('../dal/dal');

exports.renderSignInPage = function(req, res) {
  res.render('signin', { title: 'Sign In' });
};

exports.SignOut = function(req, res) {
  // Destroy Session
  req.session.destroy();
  res.locals.session.destroy();
  res.redirect('/TMS/signin');
};

exports.SignIn = function(req, res) {
  req.assert('username', 'Username cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();

  // Store any errors
  const errors = req.validationErrors();
  if (errors) {
    // Display errors if they are any through express-flash middleware
    req.flash('errors', errors);
    // Send Unauthorised status code with the request
    return res.status(401).render('signin');
  }

  var username = req.body.username;
  var password = req.body.password;

  // Query the database based on email
  dal.findUserByName(username)
  .exec(function(err, user) {
    // If something went wrong with the query
    if (err) {
      return res.status(500).render('signin')
    }
    // If email was not found
    else if (!user) {
      req.flash('errors', {
        msg: "User was not found"
      });
      return res.status(303).render('signin');
    }
    // If password is valid, return no errors
    if (user.password == password) {
      req.session.user = user;
      req.session.user.currentFile = null;
      // req.session.userID = name._id;
      return res.status(200).redirect('/TMS');
    } else { 
      // If the password is not valid for that specific user
      req.flash('errors', {
        msg: "Wrong password entered for that Username."
      });
      return res.status(401).render('signin');
    }
    // })
  });
};