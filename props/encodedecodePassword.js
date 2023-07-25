const bcrypt=require('bcryptjs')

const decodePassword=async (decode,encode)=>{
    const ismatch= await bcrypt.compare(decode,encode)
    console.log(decode,encode,ismatch)
    return ismatch
}

const encodePassword=async(password)=>{
    const salt=await bcrypt.genSalt(10) //it returns the promise if u dont use callback
    const Password=await bcrypt.hash(password,salt)
    return Password
    }

module.exports=
{decodePassword,encodePassword}