const express = require('express')
const { createBlog, getAllBlogs } = require('../../controllers/blogController')
const authMiddleware = require('../../middlewares/authmiddeleware')
const blogApi = express.Router()


blogApi.post('/createblog',authMiddleware,createBlog)
blogApi.get('/getblogs',getAllBlogs)

module.exports = blogApi