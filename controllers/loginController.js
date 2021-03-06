const { body, validationResult } = require("express-validator");

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

const LOGIN_VIEW = "login";

exports.validateLogin = () => {
  return [
    body("username")
      .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
      .trim()
      .withMessage(
        `Username length should be between ${MIN_LENGTH} 
        and ${MAX_LENGTH}.`
      ),
    body("password")
      .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
      .trim()
      .withMessage(
        `Password length should be between ${MIN_LENGTH} 
        and ${MAX_LENGTH}.`
      ),
  ];
};

exports.filterValidationLoginErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render(LOGIN_VIEW, {
      username: req.body.username,
      errors: errors.array(),
    });
  } else {
    next();
  }
};
