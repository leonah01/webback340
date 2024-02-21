/* ****************************************
 *  Account Controller
 *  Unit 4, deliver login view activity
 * *************************************** */
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const accountModel = require("../models/account-model");
const bcrypt = require("bcryptjs");
const regValidate = require("../utilities/account-validation");

// Deliver Login Views
// Unit 4, Deliver Login Views Activity
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Deliver Registration Views
// Unit 4, Deliver Registration Views Activity
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Process Registration Data
// Unit 4, process registration activity
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt. Unity 4
router.post("/login", (req, res) => {
  res.status(200).send("login process");
});
// Deliver Request Quote Views
// Unit 6, Request Quote Activity
router.get("/quote", utilities.handleErrors(accountController.buildQuote));

// Process Request Data
// Unit 4, process Request Quote activity
router.post(
  "/quote",
  regValidate.registationRequestQuote(),
  regValidate.checkRequestQuote,
  utilities.handleErrors(accountController.registerQuote)
);

module.exports = router;
