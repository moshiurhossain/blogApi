const express = require('express');
const { register, verifyEmail, userlogin, forgotPassword, resetPassword, getUserProfile, updateUserProfile } = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/authmiddeleware');
const authApi = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'})

authApi.post('/register',register)
authApi.post('/verifyemail',verifyEmail)
authApi.post('/userlogin',userlogin)
authApi.post('/forgotpassword',forgotPassword)
authApi.post('/resetpassword/:token',resetPassword)
authApi.get('/profile',authMiddleware,getUserProfile)
authApi.put('/updateprofile',upload.single('avatar'),updateUserProfile)



module.exports = authApi;