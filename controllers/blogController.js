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
        // generate slug from title
        const slug = generateSlug(title)
        // check if blog with same slug already exists
        const existingBlog = await blogSchema.findOne({slug})
        // if blog with same slug exists return error
        if(existingBlog) return responseHandler.error(res,'blog with this title already exists',400)
        // check if blog with same content already exists 
        const existingBlogContent = await blogSchema.findOne({content})
        // if blog with same content exists return error
        if(existingBlogContent) return responseHandler.error(res,'blog with this content already exists',400)

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

const getAllBlogsforUser = async (req,res)=>{
    try{
        const user = await userSchema.findOne({email:req.user.email})
        const blogs = await blogSchema.find({author:user._id})
        responseHandler.success(res,200,"blogs fetched successfully",blogs)
    }catch(err){
        responseHandler.error(res,'Interneal Server Error!',err)
    }
}

module.exports={
    createBlog,
    getAllBlogsforUser,
}