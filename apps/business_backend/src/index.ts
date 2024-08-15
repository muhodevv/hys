import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
});

app.post('/users', async (req, res) => {
});

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
