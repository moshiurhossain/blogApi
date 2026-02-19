const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
 title:{
    type:String,
    required:true,},
 content:{
    type:String,
    required:true,},
 author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true,},
 isActive:{
   type:Boolean,
   default:false,
 },
 slug:{
   type:String,
   unique:true,
   required:true,
 },

},{timestamps:true})

module.exports = mongoose.model('blog',blogSchema)