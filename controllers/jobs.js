const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { JsonWebTokenError } = require("jsonwebtoken");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  console.log(userId, jobId);

  const job =await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with this id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
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
