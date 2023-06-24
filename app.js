const express=require('express')
const app=express()


app.get('/',(req,res)=>{
    res.send("github")
})

app.listen(3000,console.log("listening on the port"))
