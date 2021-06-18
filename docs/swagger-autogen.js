const swaggerAutogen = require('swagger-autogen')()

const outputFile = './docs/swagger-api-specification.json'
const endpointsFiles = [
  './src/interfaces/user-route.js',
  './src/interfaces/auth-route.js'
]

const doc = {
  info: {
    "version": "0.0.1",
    "title": "NodeMongoApi",
    "description": "API with Node and Mongoose"
  },
  host: "",
  schemes: [
    "http",
    "https"
  ],
  definitions: {
    User: {
      email: "sham.vinicius@gmail.com",
      password: "passwd123",
      name: "Sham Vinicius Fiorin"
    },
    Login: {
      email: "sham.vinicius@gmail.com",
      password: "passwd123",
    }
  },
  securityDefinitions: {
    "Bearer": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header",
      "description": "Enter your bearer token in the format **Bearer &lt;token>**"
    }
  },
  "security": [{ "Bearer": [] }],
}

swaggerAutogen(outputFile, endpointsFiles, doc)