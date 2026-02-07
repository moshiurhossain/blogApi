const express = require('express');
const { register, verifyEmail } = require('../../controllers/authController');
const authApi = express.Router();

authApi.post('/register',register)
authApi.post('/verifyemail',verifyEmail)


module.exports = authApi;