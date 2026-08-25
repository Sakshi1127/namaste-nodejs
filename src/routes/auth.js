const express = require("express");
const authRouter =express.Router();
const {validationSignupData,validationLoginData}=require("../utils/validation")
const bcrypt = require("bcrypt")
const User=require("../models/user")


authRouter.post("/signup",async(req,res)=>{
    try{
   const {firstName, lastName,emailId,password}=req.body
   //validate the data
   validationSignupData(req)
 
   //encrypt the password
    const passwordHash= await bcrypt.hash(password,10)
     const user= new User({
       firstName,lastName,emailId,password:passwordHash
     })
    const savedUser =  await user.save()
      //creat a JWt token
       const token= await savedUser.getJWT()
  
       //add the token to cookies and response back to the user
       res.cookie("token",token) 
     res.send({message:"User added successfully..", data: savedUser})
    } catch(err){
     res.status(400).send("Error: " + err.message)
    }
 })



 authRouter.post("/login",async(req,res)=>{
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
       res.send(user)
      }else{
        throw new Error("Invalid credentials")
      }
  
    }catch(err){
      res.status(400).send("ERROR : " + err.message) 
    }
  })
 

  authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("Logout successfully")
  })


module.exports= authRouter