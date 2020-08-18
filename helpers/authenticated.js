const task = require('../models/tasks');
const list = require('../models/lists');

module.exports = {

    ensureAuthenticated: async (req, res, next) =>{
    
        if(req.isAuthenticated()){
            if(req.params.id == req.user._id || await list.findOne({_id: req.params.id, user: req.user._id}) || await task.findOne({_id: req.params.id, user: req.user._id}) ){
                return next();
            }
        }
        req.flash('error_msg', 'Acesso negado.')
        res.redirect('/users/login')
    }
}

        

