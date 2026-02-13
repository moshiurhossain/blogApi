const responseHandler = require("../utilities/responseHandler")
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    try{         
            // access token name from cookies
            const token = req.cookies['accessToken'] || req.headers['authorization']?.split(' ')[1]
            console.log('Token',token)
            // check if token is present
            
            if(!token) return responseHandler.error(res,'access denied, login required',401)
            // verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // check if token is valid
            if(!decoded) return responseHandler.error(res,'invalid token',401)
            // attach user to req object
            req.user = decoded 
            // proceed to next middleware
            next()
    }catch(err){
            console.log(err)
            responseHandler.error(res,'Interneal Server Error!')
    }
}

module.exports = authMiddleware