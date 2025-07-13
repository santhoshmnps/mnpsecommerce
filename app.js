const express = require('express');
const app = express();
require("dotenv").config()
const morgan = require('morgan')
const connectDB = require("./config/db_connection");
const commonFunction = require('./common/jwtVerification')

// Connect to MongoDB
connectDB();

app.use(morgan('combined'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json())

app.use('/api', commonFunction.JwtVerification, require('./route'));
const port = process.env.PORT || 5000;
app.listen(port, (err, result) => {
  if (err) console.log(err)
  else console.log(`Server Connected at ${port}`)
})