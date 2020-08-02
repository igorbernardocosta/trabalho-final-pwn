const express = require('express');
const router = express.Router();
const passport = require('passport');
const list = require('../models/lists');

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();}

    res.redirect('/users/login')
  }

/* GET home page. */


router.get('/:id', ensureAuthenticated, async (req, res) => {
  const listUser = await list.find({user: req.user._id})
  list.countDocuments({ user: req.user._id }, (err, countList) => {
    console.log(countList);
 });
  
  res.render('lists', {title: 'Listas', dados: req.user, listUser});
});

router.get('/:id/new-list', ensureAuthenticated, function(req, res){
  res.render('new-list', {title: 'Cadastrar Lista', dados: req.user});
})

router.post('/:id/new-list', ensureAuthenticated, async function(req, res){
  (await list.create({title: req.body.title, description: req.body.description, user: req.user._id}))
  res.redirect(`/lists/${req.user._id}`)
})

module.exports = router;