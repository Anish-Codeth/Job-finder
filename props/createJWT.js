const jwt=require('jsonwebtoken')


const createJWT=(data,expire)=>{

    console.log(data,process.env.JWT_SECRET,expire)
return jwt.sign(data,process.env.JWT_SECRET,expire)

}

const decodeJWT= (token)=>{
return jwt.verify(token,process.env.JWT_SECRET)

}


module.exports={createJWT,
    decodeJWT}