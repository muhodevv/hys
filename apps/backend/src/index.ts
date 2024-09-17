import express from 'express';
import 'dotenv/config';
import { connectMongo } from './db';
import { errorHandler } from 'middlewares';
import initRoutes from 'routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3003", //TODO: change this to the actual frontend url
        credentials: true
    }
));
app.use(cookieParser());

initRoutes(app);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

connectMongo().then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
        console.log('Failed to connect to MongoDB');
        console.error(err);
    });

