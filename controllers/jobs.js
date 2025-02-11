const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json(jobs);
};

const getJob = async (req, res) => {
  console.log(req.user);

  res.send("get all jobs");
};

const createJob = async (req, res) => {
  const userId = req.user.userId;
  req.body.createdBy = userId;
  console.log(userId, req.body);

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJob,
};
