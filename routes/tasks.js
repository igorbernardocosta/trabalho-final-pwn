const express = require('express');
const router = express.Router();
const passport = require('passport');
const task = require('../models/tasks');
const list = require('../models/lists');
const {ensureAuthenticated} = require('../helpers/authenticated');



router.get('/:id', ensureAuthenticated, async (req, res) => {
  const tasks = await task.find({list: req.params.id})
  const lists = await list.findOne({_id: req.params.id})

  res.render('tasks', {title: 'Tarefas', list: lists, dados: req.user, tasks});
});

router.get('/new-task/:id', ensureAuthenticated, async function(req, res){
  res.render('new-task', {title: 'Cadastrar Tarefa', list: req.params});
})

router.post('/new-task/:id', ensureAuthenticated, async function(req, res){
  await task.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user._id,
    list: req.params.id
  })
  res.redirect(`/tasks/${req.params.id}`)
})


router.get('/edit-task/:id', ensureAuthenticated, (req, res) => {
  task.findOne({_id: req.params.id}).then((exTask) => {
    res.render('edit-task', {task: exTask})
  })
})

router.post('/edit-task/:id', ensureAuthenticated, async (req, res) => {
  await task.findOne({_id: req.params.id}).then((exTask) => {
    exTask.title = req.body.title
    exTask.description = req.body.description

    exTask.save()
    res.redirect(`/tasks/${exTask.list}`)
  })
})

router.post('/status/:id', ensureAuthenticated, async (req, res) => {
  await task.findOne({_id: req.params.id}).then((exTask) => {
    if(exTask.status == 'Concluido'){
      exTask.status = ''
    }else{
      exTask.status = 'Concluido'
    }
    exTask.save()
    res.redirect(`/tasks/${exTask.list}`)
  })
})

router.get('/delete/:list/:id', ensureAuthenticated, async (req, res) => {
 res.redirect('/delete/'+req.params.list+'/'+req.params.id)
})

router.post('/delete/:list/:id', ensureAuthenticated, async (req, res) => {
  await task.remove({_id: req.params.id })
  res.redirect(`/tasks/${req.params.list}`)
})

module.exports = router;