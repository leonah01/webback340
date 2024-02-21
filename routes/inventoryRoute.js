// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const regValidate = require("../utilities/account-validation");

// get management view
router.get("/", invController.displayInventoryManagementView);

// build and post the classification to the nav
router.get("/add-classification", invController.buildAddClassification);

router.post(
  "/add-classification",
  regValidate.registationAddClassification(),
  regValidate.checkAddClassification,
  invController.addClassification
);

// create and pos the inventory
router.get("/add-inventory", invController.addInventoryGet);

router.post(
  "/add-inventory",
  regValidate.registationAddNewVehicle(),
  regValidate.checkAddNewVehicle,
  invController.addInventoryPost
);

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

module.exports = router;
