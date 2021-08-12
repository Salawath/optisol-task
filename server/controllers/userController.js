const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const { validationResult } = require("express-validator");

exports.signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: 0, errors: errors.array() });
  }
  bcrypt
    .hash(password, 12)
    .then((hashPass) => {
      const user = new User({
        name: name,
        email: email,
        password: hashPass,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ success: 1, message: "User Created", userId: result._id });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: 0, errors: errors.array() });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: 0, message: "User Not found" });
      }

      loadedUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        res.status(401).json({ success: 0, message: "Wrong password" });
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "supersecretsecret",
        { expiresIn: "5h" }
      );

      res.status(200).json({
        success: 1,
        message: "login successfully",
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
