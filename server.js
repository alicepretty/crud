const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors')
const routes = require('./routes/index')
const commentsRoutes = require('./routes/comment')
const fileupload = require('express-fileupload')
// const validator = require('./validation/validator');
// const middleware = require('./middleware'); 
// const dotenv = require('dotenv').config()
const { config } = require('dotenv');
config();
const dbURI = process.env.DB_CONNECTION;
mongoose.connect(process.env.DB_CONNECTION).then();
mongoose
	.connect(dbURI, { useNewUrlParser: true })
	.then((result) => console.log('connected to db'.blue))
	.catch((err) => console.log(err));

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
app.use('/api', routes)
// app.use('/api/comments', commentsRoutes)
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api/blogs', require('./Routes/blogroutes'))
// app.post('/blogs', middleware(schemas.blogPOST), (req, res) => {

//  app.use(errorHandler)
app.listen(port, () => console.log(`server started at on port ${port}`.yellow.bold.underline));