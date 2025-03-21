const express= require("express")
const app=express()
const connectDB =require("./config/database")
const User=require("./models/user")
const {validationSignupData,validationLoginData}=require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieparser= require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth}=require("./middlewares/auth")


//read the data json data from body
app.use(express.json());
app.use(cookieparser())

app.post("/signup",async(req,res)=>{
   try{
  const {firstName, lastName,emailId,password}=req.body
  //validate the data
  validationSignupData(req)

  //encrypt the password
   const passwordHash= await bcrypt.hash(password,10)
    const user= new User({
      firstName,lastName,emailId,password:passwordHash
    })
    await user.save()
    res.send("User added successfully..")
   } catch(err){
    res.status(400).send("Error: " + err.message)
   }
})


//login api
app.post("/login",async(req,res)=>{
  try{
    const{emailId,password}=req.body
    validationLoginData(req)

    const user = await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid credentials")
    }
    const ispasswordValid= await user.validatePassword(password)
    if(ispasswordValid){

     //creat a JWt token
     const token= await user.getJWT()

     //add the token to cookies and response back to the user
     res.cookie("token",token)
     res.send("Login successfully")
    }else{
      throw new Error("Invalid credentials")
    }

  }catch(err){
    res.status(400).send("ERROR : " + err.message) 
  }
})


app.get("/profile",userAuth,async(req,res)=>{
  try{
    const user = req.user
     res.send(user)
  }catch(err){
    res.status(400).send("ERROR : " + err.message) 
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

