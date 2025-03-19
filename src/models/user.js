const mongoose= require("mongoose")
const validator=require("validator")

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
module.exports = mongoose.model("User",userSchema);