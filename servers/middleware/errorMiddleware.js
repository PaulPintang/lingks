// ? Why Should I Create Custom ErrorHandler instead of using the built-in ErrorHandler
// ** For instance, some projects don't set NODE_ENV to "production" during the production stages.
// ** If error is not handled correctly, this could result in the disclosure of sensitive information about the server.

const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = errorHandler;
