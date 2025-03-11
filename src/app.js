const express = require("express")

const app =express()


app.use("/test", (req,res)=>{
    res.send("This is the test url");
})

app.use("/hello",(req,res)=>{
    res.send("This is hello url from the server!")
})
app.listen(3001,()=>{
    console.log('Server is listening on port 3001...')
})