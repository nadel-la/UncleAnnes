const router = require("express").Router();

router.use("/users", require("./userRouter"));
router.use("/items", require("./itemRouter"));

module.exports = router;
