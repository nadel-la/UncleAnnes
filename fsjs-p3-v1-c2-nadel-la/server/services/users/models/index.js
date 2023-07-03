const { getDb } = require("../config/connection");
const { ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static userCollections() {
    return getDb().collection("users");
  }

  static async findAll() {
    const usersData = this.userCollections();
    return await usersData.find({}, { projection: { password: 0 } }).toArray();
  }

  static async findById(id) {
    const usersData = this.userCollections();
    return await usersData.findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { password: 0 } }
    );
  }

  static async create(input) {
    const usersData = this.userCollections();
    let newInput = {
      ...input,
      password: hashPassword(input.password),
    };
    return await usersData.insertOne(newInput);
  }

  static async delete(id) {
    const usersData = this.userCollections();
    console.log(id, "<<");

    return await usersData.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
