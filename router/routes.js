const express = require('express');
const authApi  = require('./api/auth');
const blogApi = require('./api/blog');
const router = express.Router();


router.use('/auth',authApi)
router.use('/blog',blogApi)


module.exports = router;