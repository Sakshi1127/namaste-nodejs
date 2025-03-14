const express = require("express")

const app =express()

const {adminAuth,userAuth}=require("./middlewares/auth")

app.use("/admin",adminAuth)

app.use("/admin/getData",(req,res)=>{
        res.send("All Data Sent")
})

app.use("/admin/deleteUser",(req,res)=>{
        res.send("Delete user successfully")
})

app.use("/user/login",(req,res)=>{
    res.send("User log in successfully")
})

app.use("/user",userAuth,(req,res)=>{
    res.send("All Data Sent to user")
})


app.listen(3001,()=>{
    console.log('Server is listening on port 3001...')
})