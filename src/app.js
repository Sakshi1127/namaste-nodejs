const express= require("express")
const app=express()
const connectDB =require("./config/database")
const User=require("./models/user")

//read the data json data from body
app.use(express.json())


app.post("/signup",async(req,res)=>{
   const user= new User(req.body)
   try{
    await user.save()
    res.send("User added successfully..")
   } catch(err){
    res.status(400).send("Error savong the user:" + err.message)
   }
})

//get user by email
// app.get("/user",async(req,res)=>{
//     const userEmail = req.body.emailId
//     try{
//         const user = await User.find({emailId:userEmail})
//         if(user.length === 0){
//             res.status(404).send("User not found")
//         }else{
//         res.send(user)
//         }
//     }catch{
//         res.status(404).send("Something went wrong")
//     }
// })

//get user by email if twoo user has same eamil then we only find one
app.get("/user",async(req,res)=>{
    const userEmail= req.body.emailId
   try{
      const user= await User.findOne({emailId:userEmail})
      if(!user){
        res.status(404).send("User not found")
      }else{
        res.send(user)
      }
   }catch{
    res.status(404).send("something went wrong")
   }
})

//FeedAPI  - GET /feed - get all the usersfrom the database
app.get("/feed",async (req,res)=>{
  try{
    const user= await User.find({})
    res.send(user)

  }catch{
    res.status(404).send("Something went wrong")

  }
})

//delete user by Id
app.delete("/user",async(req,res)=>{
  const userId= req.body.userId
    try{
       const user= await User.findByIdAndDelete(userId)
       res.send("User Deleted Successfully")
    }
    catch{
    res.status(404).send("Something went wrong")
    }
})

//update the user
// app.patch("/user",async(req,res)=>{
//   const userId=req.body.userId
//   const data=req.body
//   try{
//     const user= await User.findByIdAndUpdate(userId,data)
//     res.send("User Updated Successfully")
//   }catch{
//     res.status(404).send("Something Went wrong")
//   }
// })

//update by email Id
app.patch("/user",async(req,res)=>{
  const userEmail= {emailId:req.body.emailId}
  const data =req.body

  try{
    const user = await User.findOneAndUpdate(userEmail,data) 
    res.send("User updated")
  }catch{
    res.status(404).send("Something Went wrong")
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

