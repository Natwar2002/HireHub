import express from "express";
import { connectDB } from "./config/dbConfig.js";
import appRouter from './routes/appRouter.js';
import cors from 'cors';


const app = express();

app.use(cors({
    origin:"*"
}));

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/api', appRouter);

app.get('/ping', (req, res) => {
    res.json({
        message: 'pong',
        server: 'live'
    })
});

app.listen(3001, async () => {
    try {
        await connectDB();
        console.log('server is running on port 3001')
    } catch (error) {
        console.log('Error', error);
    }
})