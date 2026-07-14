const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs : 1000*60*15, 
    max :5 ,
    message:{
        success :true,
        message: "Too many attempts. Please try again later!"
    }
})

const jobLimiter = rateLimit({
    windowMs : 1000*60*15, 
    max :100 ,
    message:{
        success :true,
        message: "Too many requests. Please try again later!"
    }
})

const forgetPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,

    message:{
        success:false,
        message:"Too many Email requests. Please wait 15 minutes."
    }
});

const verifyOtpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message:{
        success:false,
        message:"Too many incorrect OTP attempts."
    }
});

const resetPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message:"Too many password reset attempts."
    }
});
module.exports = {authLimiter,jobLimiter,resetPasswordLimiter,verifyOtpLimiter,forgetPasswordLimiter};