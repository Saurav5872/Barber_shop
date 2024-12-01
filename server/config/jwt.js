const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) =>{
    jwt.verify(req.cookies.userToken, process.env.JWT_KEY, (err, payload)=>{
        if(err){
            console.log(err)
            res.status(401).json({verified: false});
        } else {
            next();
        }
    })
}