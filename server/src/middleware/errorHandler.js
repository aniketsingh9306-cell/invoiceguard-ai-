 const AppError = require("../utils/AppError");
const env = require("../config/env");

const notFound =(req,res,next)=>{
    next(new AppError (`route not found:${req.originalUrl}`,404));

}
const errorHandler = (err, req, res, next) => {
    const statusCode =err.statusCode || 500;

    const isExpected = err.isOperational === true;
    if(!isExpected){
        console.log(err);
    }
    const response = {
    success: false,
    message: isExpected ? err.message : "Something went wrong",
  };
  if (env.nodeEnv === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };
