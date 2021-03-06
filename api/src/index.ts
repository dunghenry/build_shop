import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB';
import route from './routes'
dotenv.config();

//! config cors production
//const listURL = [];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (listURL.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// }
//?config cors development
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
const port = process.env.PORT || 4000;
const app = express();
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(bodyParser.json({limit : '30mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(helmet());
connectDB();
route(app);
app.listen(port, () => console.log(`App listening on http://localhost:${port}`));