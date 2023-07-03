const {
  Item,
  User,
  Category,
  Ingredient,
  AdditionalImage,
} = require("../models");
const {
  sequelize,
  Sequelize: { Op },
} = require("../models");

class ItemController {
  static async getItems(req, res) {
    try {
      const items = await Item.findAll({
        order: [["updatedAt", "DESC"]],
      });
      if (!items) {
        throw { name: `Data not found` };
      }
      res.status(200).json(items);
    } catch (error) {
      if (error.name === `Data not found`) {
        return res.status(404).json({ message: " Data not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async addItem(req, res) {
    const t = await sequelize.transaction();
    // let mongoId = req.user.id;
    let mongoId = "646ee3222ac826ada86026e2";
    try {
      // console.log(req.body);
      let { name, description, price, imgUrl, categoryId } = req.body;

      // console.log(typeof [imgUrl]);
      if (typeof imgUrl !== "object") {
        imgUrl = [imgUrl];
      }
      const itemCreate = await Item.create(
        {
          name,
          description,
          price,
          imgUrl: imgUrl[0],
          categoryId,
          mongoId,
        },
        { transaction: t }
      );
      if (imgUrl.length > 1) {
        const imageObjects = imgUrl.map((url) => ({
          itemId: itemCreate.id,
          image: url,
        }));
        await AdditionalImage.bulkCreate(imageObjects, { transaction: t });
      } else {
        await AdditionalImage.bulkCreate(
          [{ itemId: itemCreate.id, image: imgUrl[0] }],
          { transaction: t }
        );
      }

      await t.commit();

      res.status(201).json(itemCreate);
    } catch (error) {
      await t.rollback();
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        // return res.send(error);
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteItem(req, res) {
    const t = await sequelize.transaction();

    const id = req.params.id;

    try {
      const item = await Item.findByPk(id, { transaction: t });

      if (!item) {
        throw { name: `Data not found` };
      }
      let name = item.name;
      await item.destroy({ where: { id }, transaction: t });

      await t.commit();
      res.status(200).json({ message: `${name} deleted successfully` });
    } catch (error) {
      await t.rollback();

      if (error.name === `Data not found`) {
        return res.status(404).json({ message: " Data not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getItemById(req, res) {
    const id = req.params.id;
    // console.log(id, "<<<<");
    try {
      const item = await Item.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Ingredient,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: AdditionalImage,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!item) {
        throw { name: `Data not found` };
      }

      res.status(200).json(item);
      console.log(item);
    } catch (error) {
      if (error.name === `Data not found`) {
        return res.status(404).json({ message: " Data not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async editItem(req, res) {
    const t = await sequelize.transaction();

    try {
      let itemId = req.params.id;
      // let mongoId = req.user.id;
      let mongoId = "646ee5339780343d79b842aa";
      console.log(req.body, "<<<");
      let { name, description, price, imgUrl, categoryId } = req.body;
      await Item.update(
        { name, description, price, imgUrl, categoryId, mongoId },
        {
          where: {
            id: itemId,
          },
          transaction: t,
        }
      );
      const item = await Item.findByPk(itemId, { transaction: t });

      await t.commit();
      res.status(200).json(item);
    } catch (error) {
      await t.rollback();

      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ItemController;
