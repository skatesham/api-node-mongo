const UserSchema = require('./user-model');
const ObjectID = require('mongodb').ObjectID

class UserService {

    save(user) {
        return UserSchema.create(user)
    }

    findById(id) {
        return UserSchema.findById(new ObjectID(id))
    }

    findAll() {
        return UserSchema.find();
    }

    deleteById(id) {
        return UserSchema.findOneAndRemove({ "_id": new ObjectID(id) })
    }

    update(id, user) {
        return UserSchema.findOneAndUpdate({ "_id": new ObjectID(id) }, user)
    }

}

module.exports = UserService