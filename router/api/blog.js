const express = require('express')
const { createBlog } = require('../../controllers/blogController')
const authMiddleware = require('../../middlewares/authmiddeleware')
const blogApi = express.Router()


blogApi.post('/createblog',authMiddleware,createBlog)

module.exports = blogApi