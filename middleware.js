const {JWT_SECRET} = require('./config')
const jwt = require('jsonwebtoken')

 function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.json({
            message: "somethinf went wrong"
        })
        
    }
    const token = authHeader.split(" ")[1]

    try{
        console.log(token);
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.userId = decoded.userId
        next();

    }
    catch(err){
        return res.status(411).json("error decoding")
    }
}

module.exports = {
    authMiddleware
}
