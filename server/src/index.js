import express from "express"
import { connectDB } from "./config/dbConfig.js";
import appRouter from './routes/appRouter.js';


const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/app', appRouter);

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