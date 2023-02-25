const app = require('./app')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const PORT = 3000;
const HOST = 'mongodb+srv://grynka:230888@cluster0.s6bvtdk.mongodb.net/db-contacts';

const connection = mongoose.connect(HOST, {
  promiseLibrary: global.Promise,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful")
    })
  })
  .catch((err) =>{
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1)}
  )
