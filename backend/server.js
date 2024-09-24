import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectMongo from './db/connectMongo.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 6000


app.get('/',(req,res)=>{
    res.send("Server is Running!!")
})

app.use('/api/auth',authRoutes)

app.listen(PORT, ()=>{
    connectMongo()
    console.log(`server is running on ${PORT}`);
})