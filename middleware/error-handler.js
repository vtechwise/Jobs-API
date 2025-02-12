const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong",
  };
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )}, please change the field value`;
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;
