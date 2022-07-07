const { validationResult } = require('express-validator');




const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      // const errors = validationErrors
      const errors = {}
      validationErrors.array().forEach((error) => errors[error.param] = `${error.msg}`);

      const err = Error('Validation error');
      err.errors = errors;
      err.status = 400;
      // err.title = 'Bad request.';
      err.title = "Validation Errors"
      next(err);
    }
    next();
  };

  module.exports = {
    handleValidationErrors
  };
