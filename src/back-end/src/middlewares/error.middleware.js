const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    // mongoose bad onbjectId
    if (err.name === "castError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message, 404);
    }

    // mongoose duplicate key
    if (err.code === 11000) {
      const message = `Duplicate field value entered`;
      error = new Error(message, 400);
    }

    // mogoose validation error
    if (err.name === "validationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new Error(message.join(", "), 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
