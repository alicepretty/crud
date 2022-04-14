const express = require('express')
const colors = require('colors')
const commentsRoutes = require('./routes/comment')
const fileupload = require('express-fileupload')
// const bodyParser = require('body-parser');
// const path = require('path');
// const util = require('util')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errormiddleware')
const connectDB =require('./config/db')
const port = process.env.PORT || 5000


// connectDB()

const app = express()
const { json } = express;


app.use(express.urlencoded({extended : false}))
app.use(fileupload({ useTempFiles: true }));
app.use(express.json());
app.use(json());
app.use('/api/comments', commentsRoutes)
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/blogs', require('./Routes/blogroutes'))
// app.use('api/comments', require('../routes/commentsRoutes'))
 app.use(errorHandler)
app.listen(port, () => console.log(`server started at on port ${port}`.yellow.bold.underline));