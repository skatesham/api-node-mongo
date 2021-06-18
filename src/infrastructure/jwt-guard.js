var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var token = req.headers['authorization']; 
    if (!token) 
        return res.status(403).send({ auth: false, message: "Token is not present on header 'authorization'." }); 
    
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) { 
        if (err) {
            return res.status(403).send({ auth: false, message: 'Expired or invalid token.' }); 
        }
        req.userId = decoded.id; 
        console.log("Decoded: " + decoded)
        next(); 
    }); 
}