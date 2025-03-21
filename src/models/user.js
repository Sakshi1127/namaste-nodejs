const mongoose= require("mongoose")
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")



const userSchema= new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true,
        minlength:4
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error ("Email id is not valid")

           }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
             throw new Error ("Password  must be strong")
 
            }
         }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!['male',"female","other"].includes(value)){
                throw new Error ("Gender Data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type:[String]
    }
},{timestamps:true})

userSchema.methods.getJWT= async function(){
    const user= this

    const token = await jwt.sign({_id:user.id},"Sakshi@2399",{expiresIn:"7d"})
    return token
}


userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user= this
    const ispasswordValid= await bcrypt.compare(passwordInputByUser,user.password)
    return ispasswordValid
}
module.exports = mongoose.model("User",userSchema);