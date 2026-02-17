const blogSchema = require("../models/blogSchema")
const responseHandler = require("../utilities/responseHandler")

const createBlog =async (req,res)=>{
    try{
        // get data from req.body
        const{title,content}=req.body
        // validate blog info
        if(!title || !content) return responseHandler.error(res,'must provide all information',400)
        // get author id from req.user
        const authorid = req.user.id
        console.log(`Author ID: ${authorid}`) 
        // create blog in database
       const blog = new blogSchema({
        title,
        content,
        author:authorid,
       })
        await blog.save()

        responseHandler.success(res,201,"blog created successfully",blog)
    }catch(err){
        console.log(err)
        responseHandler.error(res,'Interneal Server Error!')
    }
}

module.exports={
    createBlog,
}