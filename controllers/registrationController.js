const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const REGISTRATION_VIEW = "registration";
const HOME_VIEW = "/";

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

const RECAPTCHA_API = "https://www.google.com/recaptcha/api/siteverify";
const SECRET_KEY = process.env.JAGENT_RECAPTCHA_SECRET_KEY;
const SITE_KEY = process.env.JAGENT_RECAPTCHA_SITE_KEY;

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
          throw new Error("Passwords don't match.");
        } else {
          return value;
        }
      }),
    body("g-recaptcha-response").custom(async (gRecaptchaResponse, { req }) => {
      if (gRecaptchaResponse) {
        const recaptchaParams = new URLSearchParams();
        recaptchaParams.append("secret", SECRET_KEY);
        recaptchaParams.append("response", gRecaptchaResponse);
        recaptchaParams.append("remoteip", req.ip);
        const recaptchaApiResponse = await fetch(RECAPTCHA_API, {
          method: "POST",
          body: recaptchaParams,
        });
        const verificationResult = await recaptchaApiResponse.json();
        if (!verificationResult.success) {
          throw new Error("Failed captcha verification.");
        }
      } else {
        throw new Error("You didn't check 'I'm not a robot'.");
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
        recaptchaSiteKey: SITE_KEY,
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
