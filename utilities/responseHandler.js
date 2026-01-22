const responseHandler = {
  success: (
    res,
    statusCode = 200,
    message = "Success",
    data = null
  ) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: (
    res,
    message = "Something went wrong",
    errors = null,
    statusCode = 500,
  ) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  },
};

module.exports = responseHandler;