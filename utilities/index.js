const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};
/* **************************************
 * Build the classification view HTML
 * ************************************ 
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};
/* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = (data) => {
  let grid;
  if (data.length > 0) {
    grid = '<div class="vehicle-detail-container">';
    data.forEach((vehicle) => {
      grid += '<div class="vehicle-detail">';
      grid += `<h1 title="${vehicle.inv_make} ${vehicle.inv_model}">${vehicle.inv_make} ${vehicle.inv_model}</h1>`;
      grid += `<img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">`;
      grid += '<div class="vehicle-info">';
      grid += `<p>Year: ${vehicle.inv_year}</p>`;
      grid += `<p>Color: ${vehicle.inv_color}</p>`;
      grid += `<p>Price: $${new Intl.NumberFormat("en-US").format(
        vehicle.inv_price
      )}</p>`;
      grid += `<p>Mileage: ${new Intl.NumberFormat("en-US").format(
        vehicle.inv_miles
      )} miles</p>`;
      grid += "</div>";
      grid += '<div class="vehicle-description">';
      grid += `<h2>Description:</h2>`;
      grid += `<p>${vehicle.inv_description}</p>`;
      grid += "</div>";
      grid += "</div>";
    });
    grid += "</div>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};
/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getClassificationId = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list =
    "<label>Classification <br><input list='classification_id' name='classification_id' placeholder = 'Choose a Classification' autocomplete='off'></label><br><br>";
  list += "<datalist id='classification_id'>";
  data.rows.forEach((row) => {
    list +=
      "<option value=" + row.classification_id + ">" + row.classification_name;
    list += "</option>";
  });
  list += "</datalist>";
  return list;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;