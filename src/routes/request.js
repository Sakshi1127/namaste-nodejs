const express=require('express')
const requestRouter= express.Router()
const {userAuth}=require("../middlewares/auth")


requestRouter.post("/sendConnectiomnRequest",userAuth,async(req,res)=>{
    const user = req.user
    res.send(user.firstName + "sen the connetion request")
})

module.exports= requestRouter