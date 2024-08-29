import express from 'express';
import 'dotenv/config';
import { connectMongo } from './db';
import { errorHandler } from 'middlewares';
import initRoutes from 'routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3003",
        credentials: true
    }
));

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

