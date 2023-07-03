const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

const BASE_URL_APP = `http://localhost:4002/items`;
const BASE_URL_USERS = `http://localhost:4001`;

class ItemController {
  static async getAllItems(req, res) {
    try {
      const itemsCache = await redis.get("app:itemsAll");
      let allItems;
      if (itemsCache) {
        allItems = JSON.parse(itemsCache);
      } else {
        let { data: items } = await axios.get(`${BASE_URL_APP}`);

        await redis.set("app:itemsAll", JSON.stringify(items));
        allItems = items;
      }

      res.status(200).json(allItems);
    } catch (error) {
      if (error.name === "AxiosError") {
        return res.status(404).json(error.response.data);
      }
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async addItem(req, res) {
    try {
      const { data } = await axios.post(`${BASE_URL_APP}`, req.body);
      await redis.del("app:items");
      await redis.del("app:itemsAll");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async getItemById(req, res) {
    try {
      const { id } = req.params;
      const itemsCache = await redis.get("app:items");
      let items;

      if (itemsCache && itemsCache.id === id) {
        items = JSON.parse(itemsCache);
      } else {
        let { data: item } = await axios.get(`${BASE_URL_APP}/${id}`);

        items = item;
        const { data: user } = await axios.get(
          `${BASE_URL_USERS}/users/${item.mongoId}`
        );
        item = {
          ...item,
          user: user,
        };
        items = item;
        await redis.set("app:items", JSON.stringify(items));
      }
      res.status(200).json(items);
    } catch (error) {
      if (error.name === "AxiosError") {
        return res.status(404).json(error.response.data);
      }
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async deleteItem(req, res) {
    let { id } = req.params;
    try {
      const { data } = await axios.delete(`${BASE_URL_APP}/${id}`);
      await redis.del("app:items");
      await redis.del("app:itemsAll");

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async editItem(req, res) {
    let { id } = req.params;
    try {
      const { data } = await axios.put(`${BASE_URL_APP}/${id}`, req.body);
      await redis.del("app:items");

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = ItemController;
