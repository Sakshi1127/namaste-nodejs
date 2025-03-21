const express= require("express")
const app=express()
const connectDB =require("./config/database")
const cookieparser= require("cookie-parser")


//read the data json data from body
app.use(express.json());
app.use(cookieparser())

const authRouter =require("./routes/auth")
const profileRouter =require("./routes/profile")
const requestRouter =require("./routes/request")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)


connectDB().then(()=>{
    console.log('Database connection established...')
    app.listen(3001,()=>{
        console.log('Server is running on port 3001.....')
    })
}).catch(()=>{
    console.log('Database can not be connected!!')
})

