const { body } = require("express-validator");

exports.signup = [
  body("name").not().isEmpty().trim().withMessage("Name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please Enter valid Email Address")
    .normalizeEmail(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("Password must 6 digits"),
];

exports.login = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please Enter valid Email Address")
    .normalizeEmail(),
  body("password").not().isEmpty().withMessage("Password is Required"),
];
