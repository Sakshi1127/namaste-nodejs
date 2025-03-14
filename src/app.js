const express= require("express")
const app=express()

//error-handling

app.use("/getUserData",(req,res)=>{
    try{
    throw new Error("Error happened")
    }catch(err){
        res.status(500).send("Somehting went wrong......!!")
    }
})


//we need to handdle this gracefully by write a error-handler
//always write error-handle at the end
app.use("/",(err,req,res,next)=>{
     if(err){
        res.status(500).send("Somehting went wrong!!")
     }
})

app.listen(3001,()=>{
    console.log('Server is running on port 3001.....')
})