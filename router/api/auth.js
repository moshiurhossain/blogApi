const express = require('express');
const { register, verifyEmail, userlogin, forgotPassword } = require('../../controllers/authController');
const authApi = express.Router();

authApi.post('/register',register)
authApi.post('/verifyemail',verifyEmail)
authApi.post('/userlogin',userlogin)
authApi.post('/forgotpassword',forgotPassword)


module.exports = authApi;