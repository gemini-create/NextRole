const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type:String,required:true,trim: true,unique: true},
    email:{type:String,required:true,trim: true,unique: true,lowercase: true,},
    password:{type:String,required:true},
    resetOTP :{type:String, default: null},
    otpExpiry :{type:Date, default: null},
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);