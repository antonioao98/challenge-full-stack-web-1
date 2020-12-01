const routes = require('express').Router();
const StudentController = require('./controllers/StudentController')

routes.get('/Student', StudentController.findAllStudent)

routes.post('/newStudent',StudentController.createStudent)

routes.delete('/deleteStudent/:id',StudentController.deleteStudent)

routes.put('/updateStudent/:id',StudentController.updateStudent)


module.exports = routes;