const { Category } = require("../models");
const {
  sequelize,
  Sequelize: { Op },
} = require("../models");

class CategoryController {
  static async getCategory(req, res) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["createdAt", "ASC"]],
      });
      if (!categories) {
        throw { name: `Data not found` };
      }
      res.status(200).json(categories);
    } catch (error) {
      if (error.name === `Data not found`) {
        return res.status(404).json({ message: " Data not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async addCategory(req, res) {
    const t = await sequelize.transaction();
    let { name } = req.body;

    try {
      const category = await Category.create({ name }, { transaction: t });

      await t.commit();
      res.status(201).json(category);
    } catch (error) {
      await t.rollback();
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getCategoryById(req, res) {
    const id = req.params.id;
    try {
      const category = await Category.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!category) {
        throw { name: `Data not found` };
      }
      res.status(200).json(category);
    } catch (error) {
      if (error.name === `Data not found`) {
        return res.status(404).json({ message: " Data not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async editCategory(req, res) {
    const t = await sequelize.transaction();
    try {
      let id = req.params.id;
      let { name } = req.body;
      await Category.update(
        { name },
        {
          where: {
            id,
          },
          transaction: t,
        }
      );
      const category = await Category.findByPk(id, { transaction: t });

      await t.commit();
      res.status(200).json(category);
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteCategory(req, res) {
    const t = await sequelize.transaction();

    const id = req.params.id;

    try {
      const category = await Category.findByPk(id, { transaction: t });
      if (!category) {
        throw { name: `Data not found` };
      }
      let name = category.name;
      await Category.destroy({ where: { id }, transaction: t });

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
}

module.exports = CategoryController;
