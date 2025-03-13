const express = require("express")

const app =express()


app.get("/user",(req,res)=>{
    res.send({firstname:'sakshi',lastname:'maheshwari'})
})

app.post("/user",(req,res)=>{
    res.send("Data is saved successfully")
})


app.delete("/user",(req,res)=>{
    res.send("Data is Deleted  successfully")
})


app.listen(3001,()=>{
    console.log('Server is listening on port 3001...')
})