class CustomError extends  Error{
   constructor(status,message){
       super(message)
       this.statuscode=status
   }
}

module.exports=CustomError