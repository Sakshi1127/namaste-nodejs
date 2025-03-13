const express = require("express")

const app =express()

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     res.send("Hello")
// })


// app.get("/user/:userId",(req,res)=>{
//     console.log(req.params)
//     res.send("Hello")
// })


app.listen(3001,()=>{
    console.log('Server is listening on port 3001...')
})