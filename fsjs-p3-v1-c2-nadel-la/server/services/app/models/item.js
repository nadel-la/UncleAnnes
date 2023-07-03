"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Item.belongsTo(models.User, { foreignKey: "authorId" });
      Item.belongsTo(models.Category, { foreignKey: "categoryId" });
      Item.hasMany(models.AdditionalImage, { foreignKey: "itemId" });
      Item.hasMany(models.Ingredient, { foreignKey: "itemId" });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Name is required`,
          },
          notEmpty: {
            msg: `Name is required`,
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Description is required`,
          },
          notEmpty: {
            msg: `Description is required`,
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Price is required`,
          },
          notEmpty: {
            msg: `Price is required`,
          },
          min: {
            args: [20000],
            msg: "Price must be greater than 20000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `ImgUrl is required`,
          },
          notEmpty: {
            msg: `ImgUrl is required`,
          },
        },
      },
      categoryId: DataTypes.INTEGER,
      mongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
