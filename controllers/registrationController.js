const User = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { body, validationResult } = require("express-validator");

const REGISTRATION_VIEW = "registration";
const HOME_VIEW = "/";

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

exports.validateRegistration = () => {
  return [
    body("username")
      .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
      .trim()
      .withMessage(
        `Username length should be between ${MIN_LENGTH} 
        and ${MAX_LENGTH}.`
      )
      .isAlphanumeric()
      .withMessage("Username has non-alphanumeric characters.")
      .custom(async (value) => {
        const isExists = await User.exists({ username: value });
        if (isExists) {
          return Promise.reject();
        }
      })
      .withMessage("Such username already exists."),
    body("password")
      .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
      .trim()
      .withMessage(
        `Password length should be between ${MIN_LENGTH} 
        and ${MAX_LENGTH}.`
      )
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match.");
        } else {
          return value;
        }
      }),
  ];
};

exports.saveUser = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    const { username, password } = req.body;
    if (!errors.isEmpty()) {
      res.render(REGISTRATION_VIEW, {
        username: username,
        errors: errors.array(),
      });
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      const user = new User({
        username: username,
        password: hash,
      });
      await user.save();
      res.redirect(HOME_VIEW);
    }
  } catch (err) {
    return next(err);
  }
};
