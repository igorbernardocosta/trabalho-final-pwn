const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const user = require('../models/users');


router.get('/register', (_, res) => {
  res.render('register', {title: 'Crie sua conta'});
});

router.post('/register', (req, res) => {

    var errors = []

    if(req.body.password != req.body.password02){
      errors.push({texto: 'As senhas digitas são diferentes, tente novamente'})
    }

    if(errors.length > 0){
      res.render('register', {errors: errors})

    }else{
      User.findOne({email: req.body.email}).then((user) => {
        if(user){
          req.flash('error_msg', 'Já existe uma conta cadastrada com esse endereço de e-mail');
          res.redirect('/users/register')

        }else{
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
              newUser.password = hash
              newUser.save()
              res.redirect('/users/login')
            })
          })          
        }
      })
    }
})
   
router.get('/login', (req, res) => {
  res.render('login', {title: 'Login'});
});


router.post('/login', (req, res,) =>{
  passport.authenticate('local', {
    successRedirect: '/users/validated',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res)
});

router.get('/validated', (req, res) => {
  res.redirect(`/lists/${req.user._id}`)
});

router.get('/logout', (req, res) =>{
  req.logOut()
  req.flash('success_msg', 'Deslogado com sucesso')
  res.redirect('/users/login')
})

module.exports = router;
