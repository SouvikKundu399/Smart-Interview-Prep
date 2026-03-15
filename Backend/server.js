import dotenv from "dotenv";
import app from './src/app.js'
import cors from "cors"; 
import connectToDB from './src/DB/db.js'

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 6000;
const BASE_URL = `http://localhost:${PORT}`;
app.use(cors({
    origin: BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

connectToDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});