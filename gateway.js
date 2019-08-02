const config = require('./config/config');
const jwt = require('jsonwebtoken');

const UnAutharizedRoute=['/login']

function verifyToken(req,res,next){
    let urlPath=req.path.split('/');
    if(UnAutharizedRoute.indexOf(urlPath[urlPath.length-1])!==-1)
    next();
    else if(UnAutharizedRoute.indexOf(urlPath[urlPath.length-1])==-1){
        let token = req.headers['x-access-token'] || req.headers['authorization']; 
        if (token.startsWith('Bearer ')) 
            token = token.slice(7, token.length);
            if(token){
                jwt.verify(token, config.jwtSecret, (err, decoded) => {
                    if(err){
                        res.status(400).json('UnAutharized request');
                        return;
                    }
                    next();
                })
            }else{
                res.status(400).json('UnAutharized request')
            }
    }
}

module.exports = verifyToken;
