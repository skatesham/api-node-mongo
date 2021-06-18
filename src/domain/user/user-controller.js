const UserService = require('./user-service');

const userService = new UserService()

exports.post = (req, res, next) => {
   /* #swagger.tags = ['User']
      #swagger.description = 'Endpoint to create a new user' 
      #swagger.parameters['obj'] = {
         in: 'body',
         description: 'All attributes of an User.',
         required: true,
         schema: { $ref: "#/definitions/User" }
      } */
   res.setHeader('Content-Type', 'application/json')
   let userRequest = req.body

   if (!userRequest) {
      return next()
   }
   userService.save(userRequest)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(500).json(err));
};

exports.put = (req, res, next) => {
   /* #swagger.tags = ['User']
      #swagger.description = 'Endpoint to update a specific user' 
      #swagger.parameters['id'] = {
         in: 'path',
         description: 'Identify an user. Ex: 60c7e96196fd0e002eba41c8.',
         required: true
      }
      #swagger.parameters['obj'] = {
         in: 'body',
         description: 'All attributes of an User.',
         required: true,
         schema: { $ref: "#/definitions/User" }
      } */
   res.setHeader('Content-Type', 'application/json')
   let id = req.params.id
   let userRequest = req.body

   if (!id || !userRequest) {
      return next()
   }
   userService.update(id, userRequest)
      .then(user => {
         if (!user) {
            return res.status(204).send()
         }
         return res.status(200).json(user)
      })
      .catch(err => res.status(500).json(err));
};

exports.delete = (req, res, next) => {
   /* #swagger.tags = ['User']
      #swagger.description = 'Endpoint to delete a specific user.'
      #swagger.parameters['id'] = {
         in: 'path',
         description: 'Identify an user.',
         required: true
      } */
   res.setHeader('Content-Type', 'application/json')
   let id = req.params.id;
   if (!id) {
      return next()
   }

   userService.deleteById(id)
      .then(user => {
         if (!user) {
            return res.status(204).send()
         }
         return res.status(200).json(user)
      })
      .catch(err => res.status(500).json(err));
};

exports.get = (req, res, next) => {
   /* #swagger.tags = ['User']
      #swagger.description = 'Endpoint to get all users.' */
   res.setHeader('Content-Type', 'application/json')
   userService.findAll()
      .then(user => res.status(200).json(user))
      .catch(err => res.status(204).json(err));

};

exports.getById = (req, res, next) => {
   /* #swagger.tags = ['User']
      #swagger.description = 'Endpoint to get the specific user.'
      #swagger.parameters['id'] = {
         in: 'path',
         description: 'Identify an user. Ex: 60c7e96196fd0e002eba41c8.',
         required: true
      } */
   res.setHeader('Content-Type', 'application/json')
   let id = req.params.id;
   if (!id) {
      return next()
   }
   userService.findById(id)
      .then(user => {
         if (!user) {
            return res.status(204).send()
         }
         return res.status(200).json(user)
      })
      .catch(err => res.status(500).json(err));
};