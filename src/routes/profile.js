const express= require('express')
const profileRouter= express.Router()
const validator=require("validator")
const bcrypt =require("bcrypt")
const {userAuth}=require("../middlewares/auth")
const {validateProfileEditData,validateCurrentPassword}=require("../utils/validation")



profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
      const user = req.user
       res.send(user)
    }catch(err){
      res.status(400).send("ERROR : " + err.message) 
    }
   
  })


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    if(!validateProfileEditData(req)){
      throw new Error("Invalid request data")
    }

    const loggedInUser =req.user
    Object.keys(req.body).forEach((key)=> (loggedInUser[key]= req.body[key]))
    await loggedInUser.save()
    res.json({
      message :"User profile updated Successfully!!",
      data:loggedInUser
    })

  }catch(err){
    res.status(400).send("ERROR : " + err.message) 

  }
})


profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
  try{
    if(!await validateCurrentPassword(req)){
      throw new Error("Current Password is not valid!")
    }

    if(req.body?.currentPassword === req.body?.updatePassword){
      throw new Error ("current password and update password must be different.")
    }

    if(!validator.isStrongPassword(req.body?.updatePassword)){
        throw new Error (" Update Password  must be strong")
    }

    const passwordHash= await bcrypt.hash(req.body?.updatePassword,10)
    const loggedInUser= req.user
    loggedInUser.password = passwordHash
    await loggedInUser.save()
    res.send("Password Updated successfully")
  }catch(err){
    res.status(400).send("ERROR : " + err.message) 
  }
})

  module.exports=profileRouter