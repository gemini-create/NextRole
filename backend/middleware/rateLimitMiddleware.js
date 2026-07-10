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
module.exports = {authLimiter,jobLimiter};