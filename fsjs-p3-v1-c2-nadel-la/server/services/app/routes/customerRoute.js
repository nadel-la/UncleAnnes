const CustomerController = require("../Controller/customerController");

const router = require("express").Router();

router.get("/", CustomerController.getItems);
router.get("/:id", CustomerController.getItemById);

module.exports = router;
