// libaries

const userSchema = require("../models/userSchema")
const { generateOTP, otpExpiryTime } = require("../utilities/generators")
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
            otp,
            (secret)=>`
            <h1>Your OTP for email verification is</h1>
            <h2>${secret}</h2>
            <p>This OTP is valid for 5 minutes</p>
            `
        );
        // success response
        responseHandler.success(res,201,"user registered successfully",)
    }catch(err){
        console.log(err)
        responseHandler.error(res,'Interneal Server Error!')
    }
}


module.exports = {register}