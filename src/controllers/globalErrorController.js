const callDevErrorHandler = function (error, res) {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error: error.stack,
  });
};

const callProdErrorHandler = function (error, res) {
  if (error.isProductionError) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

export const globalErrorController = async function (error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";

  if (process.env.NODE_ENV === "production") {
    callProdErrorHandler(error, res);
  } else {
    callDevErrorHandler(error, res);
  }
};
