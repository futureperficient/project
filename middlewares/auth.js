const jwt = require('jsonwebtoken');
const responseGenerator = require('./../libs/responseGenerator.js');
const config = require('./../config/config.js');

module.exports.verifyToken = (req,res,next)=> {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, config.jwtsecret, (err, decoded)=> {
            if (err) { 
                const response = responseGenerator.generate(true, "Failed to Authenticate", 403, null);
                res.json(response);
            }else{
            req.user = decoded;
            next(); 
        }
        });
    } else {
        s
          return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
} 
