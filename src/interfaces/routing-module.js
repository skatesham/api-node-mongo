const UserRoute = require('./user-route');
const AuthRoute = require('./auth-route');

module.exports = (app) => {
   UserRoute(app)
   AuthRoute(app)
}