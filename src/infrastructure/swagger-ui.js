const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../docs/swagger-api-specification.json')

module.exports = (app) => {
   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}