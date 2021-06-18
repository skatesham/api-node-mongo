var jwt = require('jsonwebtoken');
const UserSchema = require('../domain/user/user-model');

function authenticate(email, password) {
    return findUserByEmail(email)
        .then(userArray => {
            return Promise.resolve({
                then: function (resolve, reject) {
                    if (userArray.length == 0) {
                        reject("Not found user.")
                    }
                    const user = userArray[0]
                    if (!isAuthorized(user.password, password)) {
                        reject("Unauthorized credential.");
                    }
                    resolve(generateJwtToken(user))
                }
            });
        })
        .catch(err => console.log(err));
}

function findUserByEmail(email) {
    return UserSchema.find({ email })
}

function isAuthorized(userPassword, password) {
    // TODO: Missing hashing encrypion on password 
    if (userPassword == password) {
        return true
    }
    return false
}

function generateJwtToken(user) {
    user.password = ''
    const token = jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // TODO: Add environment variable `process.env.JWT_EXPIRES_IN`
    );

    return token;
}

module.exports = authenticate