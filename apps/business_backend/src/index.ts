import express from 'express';
import dotenv from 'dotenv';
import { connectMongo } from './db';
import { errorHandler } from 'middlewares';

dotenv.config();

const app = express();

app.use(express.json());

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

