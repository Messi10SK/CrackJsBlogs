import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('connected to mongoDB')
})
.catch((err)=>{
console.log(err)
})



app.listen(3000,()=>{
    console.log('server started on port 3000')
})