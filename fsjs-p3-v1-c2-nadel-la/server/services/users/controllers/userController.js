const User = require("../models");

class UserController {
  static async getUsers(req, res) {
    try {
      const user = await User.findAll();
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getUserById(req, res) {
    try {
      // console.log(req.params.id, "<<<<");
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createUser(req, res) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      if (!username || !email || !password) {
        throw { name: "invalidInput" };
      }
      let role = "admin";
      const createUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      const user = await User.findById(createUser.insertedId);
      res.status(201).json(user);
    } catch (error) {
      if (error.name === "invalidInput") {
        res.status(401).json({ message: "invalid username/email/password" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      let { id } = req.params;

      await User.delete(id);
      res
        .status(200)
        .json({ message: `User with id: ${id} deleted successfully ` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
