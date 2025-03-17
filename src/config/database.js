const mongoose= require("mongoose")


const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://sakshimantri:3XhR2UYJ0wG3ON1U@cluster0.9bya6.mongodb.net/devTinder")
}

module.exports= connectDB
