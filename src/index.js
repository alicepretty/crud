import express, { urlencoded, json } from 'express';
import colors from 'colors';
import cors from 'cors';
import routes from './routes/index.js';
import fileupload from 'express-fileupload';             
import connectDB from './config/db.js';
import { config } from 'dotenv';

config();


const port = process.env.PORT || 5000;



const app = express();

app.use(urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use(json());
app.use(cors());
app.use('/api', routes);
connectDB();

app.listen(port, () =>
	console.log(
		`server started in ${process.env.NODE_ENV} mode at on port ${port}`
			.yellow.bold.underline,
	),
);

export default app;
