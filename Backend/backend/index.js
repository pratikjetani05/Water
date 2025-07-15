import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import bodyparser from 'body-parser';
import connectDB from './db.js';

import userdetail from './routes/user.route.js'

dotenv.config();

const app = express();

connectDB();

app.use(cors())
app.use(bodyparser.json());
app.use(express.json());

app.use('/api/v1/user',userdetail)

app.listen(3000,()=>{
    console.log("Server started at port 3000");
})