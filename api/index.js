import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
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

app.use(express.json());

app.listen(3000,()=>{
    console.log('server started on port 3000')
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);