import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import authRoutes from './routes/auth.routes.js'
import connectMongo from './db/connectMongo.js'

const app = express()
const PORT = process.env.PORT || 6000



app.use(express.json())

app.use('/api/auth',authRoutes)



app.get('/',(req,res)=>{
    res.send("Server is Running!!")
})

app.listen(PORT, ()=>{
    connectMongo()
    console.log(`server is running on ${PORT}`);
})