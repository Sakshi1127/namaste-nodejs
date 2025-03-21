const validator=require("validator")

const validationSignupData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body
    if(!firstName || !lastName){
        throw new Error("Name should be exists")
    }else if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid")
    }else if (!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password")
    }
}

const validationLoginData=(req)=>{
    const {emailId,password}=req.body
    if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid")
    }
}


module.exports={validationSignupData,validationLoginData}