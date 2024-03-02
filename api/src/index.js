import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/index.js';
import userRouter from './../routes/user.route.js';

//import mongoose from 'mongoose';
// dotenv.config();
// mongoose.connect(process.env.MONGODB_URL).then(() => {
//     try {
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.log(err);
//     }
// })
// app.listen(3000, () => {
//     console.log('Server is running on port 3000!');
// })

dotenv.config({
    path: './env'
})


const app = express();

const port = process.env.PORT || 3000

connectDB()
.then(() => {
    app.listen(port, () =>{
        console.log(`Server is running at port  : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!", err);
})

// now we are creating api route
app.use('/api/user', userRouter);