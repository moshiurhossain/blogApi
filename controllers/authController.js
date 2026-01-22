// libaries

const userSchema = require("../models/userSchema")
const responseHandler = require("../utilities/responseHandler")


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
       
       
       
            // create user in database
        const user = new userSchema({fullname,email,password})
        // save user
        await user.save()
        // success response
        responseHandler.success(res,201,"user registered successfully",)
    }catch(err){
        console.log(err)
        responseHandler.error(res,'Interneal Server Error!',err)
    }
}


module.exports = {register}