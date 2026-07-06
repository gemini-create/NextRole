const express= require("express");
const router= express.Router();

const {getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,} = require("../controller/jobController");

router.get("/", getJobs);

router.get("/:id", getJob);

router.post("/", createJob);

router.put("/:id", updateJob);

router.delete("/:id", deleteJob);


module.exports = router;
