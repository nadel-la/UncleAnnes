"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdditionalImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdditionalImage.belongsTo(models.Item, { foreignKey: "itemId" });
    }
  }
  AdditionalImage.init(
    {
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `itemId is required`,
          },
          notEmpty: {
            msg: `itemId is required`,
          },
        },
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdditionalImage",
    }
  );
  return AdditionalImage;
};
