// libaries
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { type } = require('os');


// user schema
const userSchema = new mongoose.Schema({
   fullname:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   role:{type:String,enum:['user','admin','author'],default:'user'},
   otp:{type:String},
   otp_expiry:{type:Date},
   is_verified:{type:Boolean,default:false},
   resetPasswordToken:{type:String},
   resetPasswordOtp_expiry:{type:Date},
},{timestamps:true})
 

userSchema.pre('save',async function () {

   if(!this.isModified('password')) return ;

      try{
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(this.password,salt)
         this.password = hashedPassword
     

      }catch(error){
         throw new Error('Error hashing password')
      }
   
})

userSchema.methods.comparePassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}


module.exports = mongoose.model('User',userSchema)