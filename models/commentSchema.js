const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
},
blog:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'blog',
    required:true,
},
comment:{
    type:String,
    required:true,
},
},{timestamps:true})

module.exports=mongoose.model('comments',commentSchema)