const blogSchema = require("../models/blogSchema")
const userSchema = require("../models/userSchema")
const { generateSlug } = require("../utilities/generators")
const responseHandler = require("../utilities/responseHandler")

const createBlog =async (req,res)=>{
    try{
        // get data from req.body
        const{title,content,isActive}=req.body
        // validate blog info
        if(!title || !content) return responseHandler.error(res,'must provide all information',400)
        // get author id from req.user
        const authorid = req.user.id
        console.log(`Author ID: ${authorid}`) 
        
        const slug = generateSlug(title)

        // create blog in database
       const blog = new blogSchema({
        title,
        content,
        author:authorid,
        slug,
        // if isActive is 'true' set it to true, otherwise set it to false
        isActive:isActive =='true'?true:false
       })
        await blog.save()

        // add blog id to user's bloglist
        const user = await userSchema.findOne({email:req.user.email})
        user.bloglist.push(blog._id)
        await user.save()

        responseHandler.success(res,201,"blog created successfully",blog)
    }catch(err){
        console.log(err)
        responseHandler.error(res,'Interneal Server Error!')
    }
}

module.exports={
    createBlog,
}