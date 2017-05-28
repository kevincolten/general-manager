const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = require('express')();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/general-manager');
const User = require('./models/User');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const uuid = require('uuid/v4');
const bodyParser = require('body-parser');

// bcrypt.hash('hello123', saltRounds)
//   .then(hash => {
//     const username = 'kevincolten@gmail.com';
//     const user = new User({
//       username,
//       password: hash,
//       apiKey: uuid(),
//     });
//     return user.save();
//   })
//   .then(user => {
//     return user.save({
//       client: user._id
//     });
//   })
//   .then(user => {
//     // res.status(200).json(user);
//     console.log(user);
//   })
//   .catch(error => {
//     console.log(error);
//     // res.status(500).json({ error });
//   });

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.apiKey === password) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.use(passport.initialize());
app.use(bodyParser.json());

// app.get(
//   '/api/me',
//   passport.authenticate('basic', { session: false }),
//   function(req, res) {
//     res.json(req.user);
//   }
// );

app.use(
  '/api/objects',
  passport.authenticate('basic', { session: false }),
  require('./routes/objects')
);

// app.use(
//   'users',
//   passport.authenticate('basic', { session: false }),
//   require('./routes/users')
// );

app.listen(3000, () => {
  console.log('Hosting on http://127.0.0.1:3000')
})

module.exports = app;
