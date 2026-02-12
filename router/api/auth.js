const express = require('express');
const { register, verifyEmail, userlogin, forgotPassword, resetPassword } = require('../../controllers/authController');
const authApi = express.Router();

authApi.post('/register',register)
authApi.post('/verifyemail',verifyEmail)
authApi.post('/userlogin',userlogin)
authApi.post('/forgotpassword',forgotPassword)
authApi.post('/resetpassword',resetPassword)


module.exports = authApi;