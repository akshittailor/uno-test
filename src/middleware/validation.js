const { validationResult } = require("express-validator");

const validation = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req).formatWith(({msg}) => msg);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.mapped(msg => msg) });
  };
};

module.exports = validation