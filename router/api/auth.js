const express = require('express');
const { register } = require('../../controllers/authController');
const authApi = express.Router();

authApi.post('/register',register)


module.exports = authApi;