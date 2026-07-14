const express = require("express");
const router = express.Router();

const {signup,login,logout,getMe,forgetPassword,verifyOtp,resetPassword} = require("../controller/authController");
const {signupValidator,loginValidator} = require("../validators/authValidators");
const auth = require("../middleware/authMiddleware");
const {authLimiter,forgetPasswordLimiter,resetPasswordLimiter,verifyOtpLimiter }= require("../middleware/rateLimitMiddleware");


router.post("/signup",signupValidator,authLimiter,signup);
router.post("/login",loginValidator,authLimiter,login);
router.post("/logout",logout);
router.get("/me",auth,getMe);
router.post("/forget-password",forgetPasswordLimiter,forgetPassword);
router.post("/verify-otp",verifyOtpLimiter,verifyOtp);
router.post("/reset-password",resetPasswordLimiter,resetPassword);



module.exports= router;