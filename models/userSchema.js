// libaries
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { type } = require('os');


// user schema
const userSchema = new mongoose.Schema({
   avatar:{type:String,
           default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fuser-avatar-vector&psig=AOvVaw26HEE1r6YAIyvSFClw7tNY&ust=1761598773931000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCvm5PgwpADFQAAAAAdAAAAABAL'   
          },
   fullname:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   role:{type:String,enum:['user','admin','author'],default:'user'},
   otp:{type:String},
   otp_expiry:{type:Date},
   is_verified:{type:Boolean,default:false},
   resetPasswordToken:{type:String},
   resetPasswordOtp_expiry:{type:Date},
   bloglist:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'blog',
    default:[],
   }]
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