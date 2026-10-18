import { config } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong in the observatory night sky';
  let errors = err.errors || [];

  // Handle Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `An entry with this ${field} already exists.`;
    errors = [`DUPLICATE_${field.toUpperCase()}`];
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for identifier: ${err.value}`;
    errors = ['INVALID_ID'];
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    errors = Object.keys(err.errors).map((key) => ({
      field: key,
      message: err.errors[key].message
    }));
  }

  // Prevent leaking internal details in production
  const response = {
    success: false,
    message,
    errors: Array.isArray(errors) ? errors : [errors]
  };

  if (!config.isProd && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

