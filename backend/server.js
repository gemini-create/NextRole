const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const jobRoutes = require("./route/jobRoutes");
const authRoutes = require("./route/authRoutes");
const auth = require("./middleware/authMiddleware.js");
const {jobLimiter }= require("./middleware/rateLimitMiddleware.js");

dotenv.config();
const app = express();
connectDB();

app.use(cors({
    origin : "http://localhost:5173",
    credentials :true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/jobs",jobLimiter,auth,jobRoutes);
app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});