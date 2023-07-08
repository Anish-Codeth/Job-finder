const {StatusCodes}=require('http-status-codes')
const notfound=async(req,res)=>{
    res.status(StatusCodes.NOT_FOUND).json({"msg":"Page not found"})
}

module.exports=notfound