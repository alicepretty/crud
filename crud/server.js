import express, { urlencoded, json as _json } from 'express';
// const mongoose = require('mongoose')
import colors from 'colors';
import routes from './routes/index';
import commentsRoutes from './routes/comment';
import fileupload from 'express-fileupload';
// const validator = require('./validation/validator');
import connectDB from './config/db';
// const dotenv = require('dotenv').config()
import { config } from 'dotenv';
config();
// const dbURI = process.env.DB_CONNECTION;
// mongoose.connect(process.env.DB_CONNECTION).then();
// mongoose
// 	.connect(dbURI, { useNewUrlParser: true })
// 	.then((result) => console.log('connected to db'.blue))
// 	.catch((err) => console.log(err));

import { errorHandler } from './middleware/errormiddleware';
const port = process.env.PORT || 5000;

// connectDB()

const app = express();
const { json } = express;

app.use(urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use(_json());
app.use(json());
app.use('/api', routes);
// app.use('/api/comments', commentsRoutes)
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api/blogs', require('./Routes/blogroutes'))
// app.post('/blogs', middleware(schemas.blogPOST), (req, res) => {

//  app.use(errorHandler)

// Connect Database
connectDB();

app.listen(port, () =>
	console.log(
		`server started in ${process.env.NODE_ENV} mode at on port ${port}`
			.yellow.bold.underline,
	),
);

export default app;
