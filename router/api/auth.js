const express = require('express');
const { register, verifyEmail, userlogin, forgotPassword, resetPassword, getUserProfile } = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/authmiddeleware');
const authApi = express.Router();

authApi.post('/register',register)
authApi.post('/verifyemail',verifyEmail)
authApi.post('/userlogin',userlogin)
authApi.post('/forgotpassword',forgotPassword)
authApi.post('/resetpassword/:token',resetPassword)
authApi.get('/profile',authMiddleware,getUserProfile)



module.exports = authApi;