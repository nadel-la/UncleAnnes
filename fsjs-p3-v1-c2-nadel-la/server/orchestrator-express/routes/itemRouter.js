const ItemController = require("../controller/itemController");

const router = require("express").Router();

router.get("/", ItemController.getAllItems);
router.post("/", ItemController.addItem);
router.get("/:id", ItemController.getItemById);
router.delete("/:id", ItemController.deleteItem);
router.put("/:id", ItemController.editItem);

module.exports = router;
