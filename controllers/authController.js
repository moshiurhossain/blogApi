// libaries

const userSchema = require("../models/userSchema")
const { generateOTP, otpExpiryTime, generateAccessToken, generateRefreshToken, generateResetPasswordToken } = require("../utilities/generators")
const { verifyemailTemplate, restpasswordTemplate } = require("../utilities/mailTempletes")
const responseHandler = require("../utilities/responseHandler")
const sendMail = require("../utilities/sendMail")


const register = async (req, res) => {
    try{
        // get data from req.body
        const {fullname,email,password}=req.body
        // validate user info
        if(!fullname || !email || !password) return responseHandler.error(res,'must provide all information',)
       //  look for existing user in db
                const existingUser = await userSchema.findOne({email})
                // return error if user exists
                if(existingUser) return responseHandler.error(res,'user already exists try a different email',)  
       
              const otp = generateOTP()
       
            // create user in database
        const user = new userSchema({
            fullname,
            email,
            password,
            otp,
            otp_expiry:otpExpiryTime(),
    })
        // save user
        await user.save()
        // send otp to user email
        sendMail(
            email,
            "Verify your email - OTP",
            verifyemailTemplate(otp,fullname)
        );
        // success response
        responseHandler.success(res,201,"user registered successfully",)
    }catch(err){
        console.log(err)
        responseHandler.error(res,'Interneal Server Error!')
    }
}
// verify email
const verifyEmail= async(req,res)=>{
    try{
        // get data from req.body
        const {email,otp} = req.body
        // validate user info
        if(!email || !otp) return responseHandler.error(res,'must provide all information',)
            const user =await userSchema.findOne({email})
        if(!user) return responseHandler.error(res,'invalid email or otp',)
            user.is_verified = true
            user.otp = null
            user.otp_expiry = null
            await user.save()
            
      // success response
        responseHandler.success(res,201,"email verified successfully",)
    }catch(err){
        console.log(err)
        responseHandler.error(res,'Interneal Server Error!')
    }
}
// user login
const userlogin= async(req,res)=>{
    try{   
        // get data from req.body
        const {email,password} = req.body
        // validate user info
        if(!email || !password) return responseHandler.error(res,'must provide all information',)
        // look for user with given email
        const user = await userSchema.findOne({email})
        // return error if user not found
        if(!user) return responseHandler.error(res,'invalid email or password',)
        // retunr error if user is not verified
        if(!user.is_verified) return responseHandler.error(res,'user is not verified',)
        // compare password
        const verifypassword = await user.comparePassword(password)
        console.log(verifypassword)
        // generate access token
        const accessToken = generateAccessToken(user._id,user.email,user.role)
        const refreshToken = generateRefreshToken(user._id,user.email,user.role)

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
        }).cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
        });
        // user info to be sent in response
        userInfo ={
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role
        }

        if(!verifypassword)  return responseHandler.error(res,'invalid credentials',)
        // success response
        responseHandler.success(res,201,"user logged in successfully",{token:accessToken,userdetails:userInfo})
        }catch(err){
        console.log(err)
        responseHandler.error(res,'Interneal Server Error!')
    }
}
// forgot password
const forgotPassword = async(req,res)=>{
    try{
        // get data from req.body
        const {email} = req.body
        // validate user info
        if(!email) return responseHandler.error(res,'must provide email',)
            // look for user with given email
            const user = await userSchema.findOne({email})
            // return error if user not found
            if(!user) return responseHandler.error(res,'user not found',)
            // generate reset password token and save in db
                const {resetToken,refreshToken} = generateResetPasswordToken()
                user.resetPasswordToken = refreshToken
                user.resetPasswordOtp_expiry= otpExpiryTime()
                await user.save()
            // create reset password link
            const restpasswordlink = `${process.env.CLIENT_URL}/#/reset-password?token=${resetToken}`;
            // send reset password token to user email
            sendMail(
                email,
                "Reset your password - OTP",
                restpasswordTemplate(user.fullname,restpasswordlink,resetToken,'5 minutes')
            );
        // all ok
        responseHandler.success(res,201,"password reset otp sent to email successfully",{resetToken,refreshToken})
    }catch(err){
        console.log(err)
        responseHandler.error(res,'Interneal Server Error!')
    }
}
module.exports = {
    register,
    verifyEmail,
    userlogin,
    forgotPassword,
}