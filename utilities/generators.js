// libaies
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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

// generate refresh token
const generateRefreshToken = (id,email,role)=>{
    return  jwt.sign({
                    id,
                    email,
                    role
            },
                    process.env.JWT_SECRET, 
                    { 
                     expiresIn: '10d' 
    })
}
// generate reset password token
const generateResetPasswordToken =()=>{
    const resetToken = crypto.randomBytes(12).toString('hex')
    const refreshToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    return {resetToken,refreshToken}
}
// slug generator
 const generateSlug = (title) => {
  if (!title) return "";

  return title
    .toString()
    .normalize("NFKD")               // Normalize accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")     // Replace non-alphanumeric with hyphen
    .replace(/-+/g, "-")             // Collapse multiple hyphens
    .replace(/^-+|-+$/g, "");        // Trim hyphens
};
// Exporting the function to be used in other modules
module.exports = {
    generateOTP,
    otpExpiryTime,
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken,
    generateSlug,
}