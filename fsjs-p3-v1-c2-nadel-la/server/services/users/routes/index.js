const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/users", UserController.getUsers);
router.post("/users", UserController.createUser);
router.get("/users/:id", UserController.getUserById);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
