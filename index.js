// libaries
const express = require('express');
const app = express()
const port = 8000
const cors = require('cors');
const dbConfig = require('./db/database');
const  route  = require('./router/routes');
const cookieParser = require('cookie-parser')
require('dotenv').config()
// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(route)
// connect to database
dbConfig()
// run port
app.listen(port,()=>{console.log(`this server is running at port: ${port}`)})