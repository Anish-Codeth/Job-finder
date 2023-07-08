class customError extends Error{
    constructor(status,message){
        super(message);
        this.statuscode=status
    }
}

module.exports=customError