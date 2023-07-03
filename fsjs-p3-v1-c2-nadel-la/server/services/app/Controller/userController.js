const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {
  sequelize,
  Sequelize: { Op },
} = require("../models");

class UserController {
  static async register(req, res) {
    const t = await sequelize.transaction();

    try {
      const createUser = await User.create(
        {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          role: "",
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json({
        id: createUser.id,
        email: createUser.email,
      });
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

  static async login(req, res) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Invalid Email/Password" };
      }
      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUser) {
        throw { name: "Invalid Email/Password" };
      }

      const validatePassword = comparePassword(
        req.body.password,
        findUser.password
      );

      if (!validatePassword) {
        throw { name: "Invalid Email/Password" };
      }

      const token = signToken({
        id: findUser.id,
        email: findUser.email,
        password: findUser.password,
      });
      res
        .status(200)
        .json({ username: findUser.username, access_token: token });
    } catch (error) {
      if (error.name === "Invalid Email/Password") {
        return res.status(401).json({ message: "Invalid Email  or Password" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
