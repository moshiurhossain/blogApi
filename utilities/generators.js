// generate a 4 digit OTP
const generateOTP =()=>{
    return Math.floor( Math.random()*9000).toString();
}

//  otp expire time
function otpExpiryTime(){
   const future = new Date(Date.now() + 5 * 60 *1000)  ; // timestamp in miliseconds
   return future
}

// Exporting the function to be used in other modules
module.exports = {
    generateOTP,
    otpExpiryTime,
}