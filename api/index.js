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

app.listen(1000,()=>{
    console.log('server started on port 1000')
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);


// error handing middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message||'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});