import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectMongo from './db/connectMongo.js'
import { app, server } from './socket/socket.js'


const PORT = process.env.PORT || 6000

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)



app.get('/',(req,res)=>{
    res.send("Server is Running!!")
})

server.listen(PORT, ()=>{
    connectMongo()
    console.log(`server is running on ${PORT}`);
})