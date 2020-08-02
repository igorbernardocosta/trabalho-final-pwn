const express = require('express');
const router = express.Router();
const passport = require('passport');
const list = require('../models/lists');
const task = require('../models/tasks');

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();}

    res.redirect('/users/login')
  }

router.get('/:id', ensureAuthenticated, async (req, res) => {
  const listUser = await list.find({user: req.user._id})
  
  res.render('lists', {title: 'Listas', dados: req.user, listUser});
});

router.get('/new-list/:id', ensureAuthenticated, (req, res) =>{
  res.render('new-list', {title: 'Cadastrar Lista', dados: req.user});
})

router.post('/new-list/:id', ensureAuthenticated, async (req, res) => {
  await list.create({title: req.body.title, description: req.body.description, user: req.user._id})
  res.redirect(`/lists/${req.user._id}`)
})

router.get('/edit-list/:id', ensureAuthenticated, (req, res) => {
  list.findOne({_id: req.params.id}).then((exlist) => {
    res.render('edit-list', {list: exlist})
  })
})

router.post('/edit-list/:id', ensureAuthenticated, async (req, res) => {
  await list.findOne({_id: req.params.id}).then((exList) => {
    exList.title = req.body.title
    exList.description = req.body.description

    exList.save()
    res.redirect(`/lists/${req.user._id}`)
    console.log('Edição salva com sucesso')
  })
})

router.post('/delete', ensureAuthenticated, async (req, res) => {
  await list.remove({_id: req.body.listId})
  await task.remove({list: req.body.listId})
  res.redirect(`/lists/${req.user._id}`)
})

module.exports = router;