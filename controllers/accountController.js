const jwt = require("jsonwebtoken");
require("dotenv").config();
const utilities = require("../utilities");
const accountModel = require("bcryptjs");

/* ****************************************
 *  Deliver login view
 *  Unit 4, deliver login view activity
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/login", {
    title: "Login",
    nav,
  });
}

/* ****************************************
 *  Deliver registration view
 * *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
}
/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    req.flash(
      "notice",
      "Sorry, there was an error processing the registration."
    );
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    });
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    );
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    });
  }
}
/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav();
  const { account_email, account_password } = req.body;
  const accountData = await accountModel.getAccountByEmail(account_email);
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.");
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    });
    return;
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password;
      const accessToken = jwt.sign(
        accountData,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 * 1000 }
      );
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
      return res.redirect("/account/");
    }
  } catch (error) {
    return new Error("Access Forbidden");
  }
}
/* ****************************************
 *  Deliver Request Quote view
 * *************************************** */
async function buildQuote(req, res, next) {
  let nav = await utilities.getNav();
  let grid = await utilities.getQuoteVehicle();
  res.render("account/requestQuote", {
    title: "Request Quote",
    nav,
    grid,
    errors: null,
  });
}

/* ****************************************
 *  Process Request Quote
 * *************************************** */
async function registerQuote(req, res) {
  let nav = await utilities.getNav();
  let grid = await utilities.getQuoteVehicle();

  const { quote_firstname, quote_lastname, quote_email, quote_model } =
    req.body;

  const regResult = await accountModel.registerRequestQuote(
    quote_firstname,
    quote_lastname,
    quote_email,
    quote_model
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations ${quote_firstname} the request for quotation has been registered. Soon we will be sending an email with the information.`
    );
    res.status(201).render("./account/requestQuote", {
      title: "Request Quote",
      nav,
      grid,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/requestQuote", {
      title: "Request Quote",
      nav,
      grid,
      errors: null,
    });
  }
}

module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  buildQuote,
  registerQuote,
};
