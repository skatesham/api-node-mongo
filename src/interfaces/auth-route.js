const authenticate = require('../infrastructure/jwt-auth')

module.exports = (app) => {

    app.post('/login', (req, res, next) => {
        /* #swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to authenticate a token' 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User credentials',
            required: true,
            schema: { $ref: "#/definitions/Login" }
        } */
        if (!req.body) {
            return next()
        }

        authenticate(req.body.email, req.body.password)
            .then(token => {
                if (!token) {
                    return res.status(403).send({ auth: false, message: "Credentials not authorized" });
                }
                return res.status(200).send({ auth: true, token: token });
            })
    })

    app.post('/logout', function (req, res) {
        /* #swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to logout a token (Do nothing yet)' 
        */
        res.status(200).send({ auth: false, token: null });
    });

}
