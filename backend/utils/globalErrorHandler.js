const sendDevErrors = (req, res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    requestedAt: req.requestedAt,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const sendProdErrors = (req, res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      requestedAt: req.requestedAt,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      requestedAt: req.requestedAt,
      message: "Something went wrong! Please try again later.",
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevErrors(req, res, error);
  } else {
    sendProdErrors(req, res, error);
  }
};
