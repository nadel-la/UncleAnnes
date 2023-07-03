// const authentication = require("../middleware/authentication");
const router = require("express").Router();

// router.use("/users", require("./usersRoute"));
router.use("/uncleAnnes", require("./customerRoute"));

// router.use(authentication);
router.use("/items", require("./itemsRoute"));
router.use("/categories", require("./categoriesRoute"));

module.exports = router;
