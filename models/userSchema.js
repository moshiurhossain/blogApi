// libaries
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { type } = require('os');
const userSchema = new mongoose.Schema({
   fullname:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   role:{type:String,enum:['user','admin','author'],default:'user'},
   otp:{type:String},
   otp_expiry:{type:Date},
   is_verified:{type:Boolean,default:false},
   resetPasswordOtp:{type:String},
   resetPasswordOtp_expiry:{type:Date},
},{timestamps:true})
 

userSchema.pre('save',async function (next) {

   if(!this.isModified('password')) return next()

      try{
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(this.password,salt)
         this.password = hashedPassword
         next()

      }catch(err){
         console.log(err)
         next()
      }
   
})

module.exports = mongoose.model('User',userSchema)