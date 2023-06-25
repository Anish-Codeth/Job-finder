const express=require('express')
const app=express()
const registerrouter=require('./routes/registerroutes')
const connectDB=require('./db/connect')

//.env
require('dotenv').config()

//for json
app.use(express.json())

app.use('/api/v1',registerrouter)


const start=async()=>{
try{
await connectDB(process.env.MONGODB_URL)
app.listen(3000,()=>console.log("listening on the port"))
    }
    catch(err)
    {
      console.log(err)
    }
}

start()
