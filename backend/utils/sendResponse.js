const sendResponse = (statusCode, req, res, message, data) => {
  res.status(statusCode).json({
    status: "success",
    requestedAt: req.requestedAt,
    message,
    data,
  });
};

module.exports = sendResponse;
