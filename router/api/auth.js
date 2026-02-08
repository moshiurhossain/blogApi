const express = require('express');
const { register, verifyEmail, userlogin } = require('../../controllers/authController');
const authApi = express.Router();

authApi.post('/register',register)
authApi.post('/verifyemail',verifyEmail)
authApi.post('/userlogin',userlogin)


module.exports = authApi;