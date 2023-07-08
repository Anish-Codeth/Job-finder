const trycatch=async(data)=>{
try{
    const datas=eval(data)
    console.log(datas)
}
catch(err){
    console.log(err)
}
}

trycatch("console.log('hi there')")

