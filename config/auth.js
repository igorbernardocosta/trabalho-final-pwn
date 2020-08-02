const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
   }, async (email, password, done) => {
    try {
     const exUser = await User.findOne({email: email})
     if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
       done(null, exUser);
      } else {
       done(null, false, { message: 'Senha Incorreta' });
      }
     } else {
        done(null, false, { message: 'Usuário não existe' });
     }
    } catch (error) {
     console.error(error);
     done(error);
    }
   }));


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) =>{
        done(err, user)
    })
})
