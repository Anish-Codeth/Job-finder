const express=require('express')
const app=express()


//error
const notfoundMiddleware=require('./middleware/notfound')
const errorMiddleware=require('./middleware/errorMiddleware')

const jobrouter=require('./routes/jobroutes')
const connectDB=require('./db/connect')

const bodyParser = require('body-parser');

//.env
require('dotenv').config()

//

// for automatic
const {task_p2o,task_delete}=require('./props/automatic')


//for json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/jobs',jobrouter)

app.use(errorMiddleware)
app.use(notfoundMiddleware)

const start=async()=>{
  try{
    await connectDB(process.env.MONGODB_URL)
    app.listen(3000,()=>console.log("listening on the port"))
    // task_p2o.start()
    // task_delete.start()
  }
  catch(err)
  {
    console.log(err)
  }
}

start()

