const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const jobRoutes = require("./route/jobRoutes");
const authRoutes = require("./route/authRoutes");
const auth = require("./middleware/authMiddleware.js");

dotenv.config();
const app = express();
connectDB();

app.use(cors({
    origin : "http://localhost:5173",
    credentials :true
}));
app.use(express.json());

app.use("/api/jobs", auth,jobRoutes);
app.use("/api/auth", authRoutes);

app.use((req,res)=>{
    res.send("<h1>Error 404: Page not found</h1>");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});