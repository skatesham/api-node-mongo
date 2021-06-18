const UserController = require('../domain/user/user-controller');
const authGuard = require('../infrastructure/jwt-guard');

module.exports = (app) => {
   app.post('/users', UserController.post);
   app.put('/users/:id', UserController.put);
   app.delete('/users/:id', authGuard, UserController.delete);
   app.get('/users', UserController.get);
   app.get('/users/:id', UserController.getById);
}
