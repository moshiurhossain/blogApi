const express = require('express')
const { createBlog, getAllBlogsforUser } = require('../../controllers/blogController')
const authMiddleware = require('../../middlewares/authmiddeleware')
const blogApi = express.Router()


blogApi.post('/createblog',authMiddleware,createBlog)
blogApi.get('/getblogs',authMiddleware,getAllBlogsforUser)

module.exports = blogApi