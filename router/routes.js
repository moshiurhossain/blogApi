const express = require('express');
const authApi = require('./api/auth');
const router = express.Router();


router.use('/auth',authApi)


module.exports = router;