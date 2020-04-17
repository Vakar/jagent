const User = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { body, validationResult } = require("express-validator");

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

exports.validateLogin = () => {
  return [
    body("username")
      .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
      .trim()
      .withMessage(
        "Username length should be from " +
          MIN_LENGTH +
          " to " +
          MAX_LENGTH +
          " characters."
      ),
    body("password")
      .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
      .trim()
      .withMessage(
        "Password length should be from " +
          MIN_LENGTH +
          " to " +
          MAX_LENGTH +
          " characters."
      ),
  ];
};

exports.filterValidationLoginErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("login", {
      username: req.body.username,
      errors: errors.array(),
    });
  } else {
    next();
  }
};

exports.validateRegistration = () => {
  return [
    body("username")
      .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
      .trim()
      .withMessage(
        "Username length should be from " +
          MIN_LENGTH +
          " to " +
          MAX_LENGTH +
          " characters."
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
        "Password length should be from " +
          MIN_LENGTH +
          " to " +
          MAX_LENGTH +
          " characters."
      )
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.confirmPassword) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
  ];
};

exports.createUser = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.render("registration", {
        username: req.body.username,
        errors: errors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
        const user = new User({
          username: req.body.username,
          password: hash,
        });
        user.save().then((result) => {
          if (result) {
            res.redirect("/");
          }
        });
      });
    }
  } catch (err) {
    return next(err);
  }
};
