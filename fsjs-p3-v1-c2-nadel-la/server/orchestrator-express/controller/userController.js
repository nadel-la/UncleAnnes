const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

const BASE_URL_USERS = `http://localhost:4001/users`;

class UserController {
  static async getUsers(req, res) {
    try {
      const usersCache = await redis.get("user:users");
      let users;

      if (usersCache) {
        users = JSON.parse(usersCache);
      } else {
        const { data } = await axios.get(`${BASE_URL_USERS}`);
        await redis.set("user:users", JSON.stringify(data));
        users = data;
      }
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async addUser(req, res) {
    try {
      const { data } = await axios.post(`${BASE_URL_USERS}`, req.body);
      await redis.del("user:users");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async deleteUser(req, res) {
    let { id } = req.params;
    try {
      const { data } = await axios.delete(`${BASE_URL_USERS}/${id}`);
      await redis.del("user:users");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
module.exports = UserController;
