const express = require("express")

const app =express()

//route handlers

// app.use("route",[rh1,rh2,rh3,rh4])   we call write like this

// app.use("route",[rh1,rh2],rh3,rh4)


app.use('/user',(req,res,next)=>{
    console.log("Route handler 1")
    // res.send('Route handler 1')
    next()
},(req,res,next)=>{
    console.log('rh2')
    // res.send('Route handler 2')
    next()
},(req,res)=>{
    console.log('rh3')
    res.send('Route handler 3')
})


app.listen(3001,()=>{
    console.log('Server is listening on port 3001...')
})