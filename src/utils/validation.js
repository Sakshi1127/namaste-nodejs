const validator=require("validator")
const bcrypt =require("bcrypt")

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
    const {emailId}=req.body
    if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid")
    }
}


const validateProfileEditData=(req)=>{
  const ALLOWED_FIELDS=["firstName","lastName","emailId","gender","age","skills","about","photoURL"]
  const isEditAllowed= Object.keys(req.body).every((field)=> ALLOWED_FIELDS.includes(field))

  return isEditAllowed;
}

const validateCurrentPassword=async (req)=>{
    const user= req.user
    const passwordInputByUser=req.body.currentPassword
    const ispasswordValid= await bcrypt.compare(passwordInputByUser,user.password);
    return ispasswordValid
}

    
module.exports={validationSignupData,validationLoginData,validateProfileEditData,validateCurrentPassword}