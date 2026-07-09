const express = require("express");
const router = express.Router();

const {signup,login,logout,getMe} = require("../controller/authController");
const {signupValidator,loginValidator} = require("../validators/authValidators");
const auth = require("../middleware/authMiddleware");

router.post("/signup",signupValidator,signup);
router.post("/login",loginValidator,login);
router.post("/logout",logout);
router.get("/me",auth,getMe);


module.exports= router;