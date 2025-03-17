const express= require("express")
const app=express()
const connectDB =require("./config/database")
const User=require("./models/user")


app.post("/signup",async(req,res)=>{
   const user= new User({
    firstName:'Punit',
    lastName:'Mehta',
    emailId:'punit@gamil.com',
    password:'punit@123'
   })

   try{
    await user.save()
    res.send("User added successfully..")
   } catch(err){
    res.status(400).send("Error savong the user:" + err.message)
   }
})


connectDB().then(()=>{
    console.log('Database connection established...')
    app.listen(3001,()=>{
        console.log('Server is running on port 3001.....')
    })
}).catch(()=>{
    console.log('Database can not be connected!!')
})

