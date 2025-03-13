import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import messageRouter from './routes/message.route.js'
import projectRoutes from './routes/project.js';
import teamRoutes from './routes/teams.js';
import cors from 'cors';
import morgan from 'morgan';
import { app,server } from './SocketIO/server.js';
dotenv.config();

app.use(express.json());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

const port = 8700;

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(``).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log(err);
    });
};


app.use(express.json())

app.use("/api/message",messageRouter)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/team", teamRoutes)
app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";        
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

server.listen(port,()=>{
    console.log("Connected")
    connect();
})
