// const tutorials = require("../controllers/tutorial.controller");
const express = require("express");
const router = require("express").Router();

const userController = require("../controllers/userController");
const userValidation = require("../validations/userValidation");
// signup
router.post("/signup", userValidation.signup, userController.signup);

// login
router.post("/login", userValidation.login, userController.login);

module.exports = router;
