
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const jobRoutes = require("./route/jobRoutes");

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);

app.use((req,res)=>{
    res.send("<h1>Error 404: Page not found</h1>");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});