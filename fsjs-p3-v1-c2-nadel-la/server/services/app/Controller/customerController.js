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

class CustomerController {
  static async getItems(req, res) {
    try {
      const items = await Item.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
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

  static async getItemById(req, res) {
    const id = req.params.id;
    try {
      const item = await Item.findByPk(id, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
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
    } catch (error) {
      if (error.name === `Data not found`) {
        return res.status(404).json({ message: " Data not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = CustomerController;
