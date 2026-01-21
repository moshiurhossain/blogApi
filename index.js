// libaries
const express = require('express');
const app = express()
const port = 8000
const cors = require('cors');
const dbConfig = require('./db');
require('dotenv').config()

// middleware
app.use(cors())

dbConfig()
// run port
app.listen(port,()=>{console.log(`this server is running at port: ${port}`)})