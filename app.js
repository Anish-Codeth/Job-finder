const express=require('express')
const app=express()
const path=require('path')
require('express-async-errors');
const authorization=require('./middleware/auth')
//error
const notfoundMiddleware=require('./middleware/notfound')
const errorMiddleware=require('./middleware/errorMiddleware')

const authrouter=require('./routes/registerroutes')
const userrouter=require('./routes/userroutes')
const jobrouter=require('./routes/jobroutes')
const companyrouter=require('./routes/companyroutes')
const connectDB=require('./db/connect')

const bodyParser = require('body-parser');

//for the data transfer
app.use(express.json({ limit: '1mb' }));

//.env
require('dotenv').config()


//
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname,'./static/testing.html'))
// })

// for automatic
const {task_p2o,task_delete}=require('./props/automatic')

//for cors
const cors=require('cors')
app.use(cors())

//for json
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())


//for the routes
app.use('/jobs',authorization,jobrouter)
app.use('/company',companyrouter)
app.use('/user',userrouter)
app.use('/',authrouter);


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




