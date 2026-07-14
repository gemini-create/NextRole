const User = require("../model/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require('crypto');
const sendMail = require("../utils/sendMail");
const { emailTemplate } = require("../utils/emailTemplate");
dotenv.config();

const signup = async (req,res)=>{
    try{
        //validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const {username,email,password} = req.body;
        const existingUsername = await User.findOne({username});
        const existingEmail = await User.findOne({email});

        //check if username already exists
        if(existingUsername){
            return res.status(400).json({
                success: false,
                message:"User already exists",
            });
        }
        else if(existingEmail){
            return res.status(400).json({
                success: false,
                message:"Email already exists",
            });
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password,10);

        //create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({
            id :user._id,
            username :user.username
            },
            process.env.JWT_SECRET,
           { expiresIn : '1d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })
        .status(201)
        .json({
            success: true,
            message: "Account created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const login=async(req,res)=>{
    try{
        //validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found!",
            });
        }

        //matching password
        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        const token = jwt.sign({
            id :user._id,
            username :user.username
            },
            process.env.JWT_SECRET,
           { expiresIn : '1d'}
        )
        
        //Login successful
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })
        .status(200)
        .json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

const logout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        success:true,
        message:"Logged out successfully"
    });
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const forgetPassword = async(req,res)=>{
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Email isn't registered!",
            });
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = Date.now()+ 1000*60*5//5 minutes
        const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

        user.resetOTP = hashedOtp;
        user.otpExpiry = otpExpiry;
        await user.save();

         //email message template
        const html= emailTemplate(user.username,otp);
        await sendMail(user.email,"NextRole - Password Reset",html);

        res.status(200).json({
            success: true,
            message:"Email sent successfully!"
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const verifyOtp = async (req,res)=>{
    const {email,otp} =req.body;
    try{

    const user = await User.findOne({email});

    if(!user || !user.resetOTP || !user.otpExpiry){
        return res.status(404).json({
                success: false,
                message: "Invalid request!",
            });
    }

    if(user.otpExpiry < Date.now()){
        return res.status(400).json({ message: 'OTP has expired.' });
    }

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    if(hashedOtp !== user.resetOTP){
        return res.status(400).json({ message: 'Invalid OTP.' });
    }

    //setting reset token for new passwod
    const resetToken = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn :"5m"}
    )
    // removing otp after successful veification
    user.resetOTP= null;
    user.otpExpiry= null;
    await user.save();

    res.status(200).json({
            success: true,
            message: "OTP Verified",
            resetToken
    });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const resetPassword = async (req,res)=>{
    const { resetToken, password } = req.body;

    try{
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(404).json({
                    success: false,
                    message: "User Not Found!",
            });
        }

        //hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        // update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
module.exports = { signup,login,logout,getMe,forgetPassword,verifyOtp,resetPassword};