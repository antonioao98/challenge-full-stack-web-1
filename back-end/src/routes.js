const routes = require('express').Router();
const {Aluno} = require('./app/models/');
const AlunoController = require('./controllers/AlunoController')

routes.get('/aluno', AlunoController.findAllAluno)

routes.post('/newAluno',AlunoController.createAluno)

routes.delete('/deleteAluno/:id',AlunoController.deleteAluno)

routes.put('/updateAluno/:id',AlunoController.updateAluno)


module.exports = routes;