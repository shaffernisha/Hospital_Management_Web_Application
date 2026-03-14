// Middleware to handle all errors in the application
const errorHandler = (err, req, res, next) => {
  console.log('[Error Handler]', err.message);

  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal server error';
 // Mongoose validation error
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }
 // MongoDB duplicate key error
  if (err.code === 11000) {
    status = 409;
    const field = Object.keys(err.keyValue)[0];
    message = field + ' already exists';
  }
// Invalid JWT token
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  }
// Expired JWT token
  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
  }
 // Send error response
  res.status(status).json({
    success: false,
    message: message,
    timestamp: new Date()
  });
};

module.exports = errorHandler;
