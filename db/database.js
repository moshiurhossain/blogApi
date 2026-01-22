const mongoose = require('mongoose')

const dbConfig = ()=>{
   return mongoose.connect(process.env.db_link)
    .then(()=>{console.log(`db connected successfully`)})
    .catch((err)=>{console.log(err)})
}

module.exports = dbConfig