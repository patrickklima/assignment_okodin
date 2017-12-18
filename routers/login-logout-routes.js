const Express = require('express');
const router = Express.Router();

var models = require('../models');
var User = models.User;

// SHOW HOME
router.get('/', (req, res) => {
  req.flash('Please Log In Or Enter a New Username');
  res.render('welcome/login');
  
});

// CREATE OR FIND USER
router.post('/', (req, res) => {
  var incomingUser;
  try {
    incomingUser = User.findOrCreate({
      where: {
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase()
      }
    });
  } catch(err) {
    req.flash(err.message);
    console.log(err.message);
    console.log(err.stack);
  }
  incomingUser.spread(userData => {
    req.session.data = {
      username: userData.username,
      email: userData.email
    };
    console.log(req.session.data);
    req.method = 'GET';
    res.redirect('/');
    res.end(JSON.stringify(req.session.data));
  });
});

// LOG OUT
router.post('/out', (req, res) => {
  req.session = null;
  res.redirect('/');
  res.end(req.session);
});

module.exports = router;