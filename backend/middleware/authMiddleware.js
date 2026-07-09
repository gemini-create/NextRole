const jwt = require("jsonwebtoken");

const auth = async (req,res,next) =>{
    try{
        const token =req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Please login your account!',
            });
        }
            const user = jwt.verify(token,process.env.JWT_SECRET);
            req.user = user;
            next();

    }catch(error){
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}
module.exports = auth;