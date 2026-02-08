// libaies
const jwt = require('jsonwebtoken');

// generate a 4 digit OTP
const generateOTP =()=>{
    return Math.floor( Math.random()*9000).toString();
}

//  otp expire time
function otpExpiryTime(){
   const future = new Date(Date.now() + 5 * 60 *1000)  ; // timestamp in miliseconds
   return future
}

// generate access token
const generateAccessToken = (id,email,role)=>{
    return   jwt.sign({
                        id,
                        email,
                        role
                      },
                       process.env.JWT_SECRET, 
                      { 
                        expiresIn: '1h' 
                      });
}

// Exporting the function to be used in other modules
module.exports = {
    generateOTP,
    otpExpiryTime,
    generateAccessToken,
}