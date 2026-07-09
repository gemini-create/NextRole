const Job = require("../model/JobModel");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user.id,
    });
    res.status(200).json(jobs);
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getJob = async (req, res) => {
  try {
    const job = await Job.findById({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json(job);
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createJob = async (req, res) => {
  try {
    const newJob = await Job.create({
      ...req.body,
      user: req.user.id,
  });
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
    });
  } 
  catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findOneAndUpdate(
      {
        _id:req.params.id,
        user:req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } 
  catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};