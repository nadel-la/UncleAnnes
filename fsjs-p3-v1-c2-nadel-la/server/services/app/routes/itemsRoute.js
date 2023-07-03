const ItemController = require("../Controller/itemController");

const router = require("express").Router();

router.get("/", ItemController.getItems);
router.post("/", ItemController.addItem);
router.delete("/:id", ItemController.deleteItem);
router.get("/:id", ItemController.getItemById);
router.put("/:id", ItemController.editItem);

module.exports = router;
