const customError=require('../errors/errors')

const errorMiddleware=(err,req,res,next)=>{
    console.log("inside middleware")
    if(err instanceof customError){

    return res.status(err.statuscode).json({"msg":err.message})
    }
    else{
        return res.json({'msg':"something went wrong"})
    }
}

module.exports=errorMiddleware