const UserController = require("../controller/userController");

const router = require("express").Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.addUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
