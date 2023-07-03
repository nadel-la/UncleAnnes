const CategoryController = require("../Controller/categoryController");

const router = require("express").Router();

router.get("/", CategoryController.getCategory);
router.post("/", CategoryController.addCategory);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", CategoryController.editCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
