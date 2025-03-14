const adminAuth=(req,res,next)=>{
    const token= "xyz"
    const isAuthenticated= token=== "xyz"
    if(!isAuthenticated){
        res.status(401).send("Admin is not authenticated")
    }else{
        next()
    }
}


const userAuth=(req,res,next)=>{
    const token= "xyzh"
    const isAuthenticated= token=== "xyz"
    if(!isAuthenticated){
        res.status(401).send("User is not authenticated")
    }else{
        next()
    }
}
module.exports={adminAuth,userAuth}