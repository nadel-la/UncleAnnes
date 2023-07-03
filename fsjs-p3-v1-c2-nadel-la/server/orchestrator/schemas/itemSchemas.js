const Redis = require("ioredis");
const redis = new Redis({
  port: 18484, // Redis port
  host: "redis-18484.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
});

const axios = require("axios");
const BASE_URL_APP = `http://app-service:4002/items`;
const BASE_URL_USERS = `http://user-service:4001/users`;

const typeDefs = `#graphql
  type Item {
    id: Int,
    name: String,
    description: String,
    price: Int,
    imgUrl: String,
    categoryId: Int,
    mongoId: String
  }

  type Category{
    id: Int,
    name: String
  }

  type Ingredients{
    id: Int,
    itemId: Int,
    name: String
  }

  type User{
        _id: String,
        username: String,
        email: String,
        role: String,
        phoneNumber: String,
        address: String
  }

  type AdditionalImage{
    id: Int,
    itemId: Int,
    image: String
  }

  type ItemById{
    id: Int,
    name: String,
    description: String,
    price: Int,
    imgUrl: String,
    categoryId: Int,
    mongoId: String,
    Category: Category,
    Ingredients: [Ingredients],
    user: User,
    AdditionalImages: [AdditionalImage]
  }

  type Query {
    items: [Item]
    item(id: Int): ItemById
  }

  type Mutation{
    addItem(name: String,
      description: String,
      price: Int,
      imgUrl: String,
      categoryId: Int): Item
 
    deleteItem(id: Int): String
    editItem(id: Int, name: String,
      description: String,
      price: Int,
      imgUrl: String,
      categoryId: Int): Item
  }

`;

const resolvers = {
  Query: {
    items: async () => {
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
        return allItems;
        // res.status(200).json(allItems);
      } catch (error) {
        if (error.name === "AxiosError") {
          throw error.response.data;
          //   return res.status(404).json(error.response.data);
        }
        console.log(error);
        throw error;
        // res.status(500).json(error);
      }
    },
    item: async (_, args) => {
      try {
        const { id } = args;
        const itemsCache = await redis.get("app:items");
        let items;

        if (itemsCache && itemsCache.id === id) {
          items = JSON.parse(itemsCache);
        } else {
          let { data: item } = await axios.get(`${BASE_URL_APP}/${id}`);

          items = item;
          const { data: user } = await axios.get(
            `${BASE_URL_USERS}/${item.mongoId}`
          );
          // console.log(item, "<<<");
          item = {
            ...item,
            user: user,
          };
          items = item;
          // console.log(items, "<<ini item");
          await redis.set("app:items", JSON.stringify(items));
        }
        return items;
      } catch (error) {
        if (error.name === "AxiosError") {
          console.log(error.response.data, "<<dari If");
          throw error.response.data.message;
        }
        console.log(error, "<<<<");
        throw error;
      }
    },
  },
  Mutation: {
    addItem: async (_, args) => {
      try {
        const { name, description, price, imgUrl, categoryId } = args;
        const { data } = await axios.post(`${BASE_URL_APP}`, {
          name,
          description,
          price,
          imgUrl,
          categoryId,
        });
        await redis.del("app:items");
        await redis.del("app:itemsAll");
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    deleteItem: async (_, args) => {
      let { id } = args;
      try {
        const { data } = await axios.delete(`${BASE_URL_APP}/${id}`);
        await redis.del("app:items");
        await redis.del("app:itemsAll");

        // res.status(200).json(data);
        console.log(data);
        return data.message;
      } catch (error) {
        console.log(error);
        // res.status(500).json(error);
        return error;
      }
    },

    editItem: async (_, args) => {
      let { id } = args;
      let { name, description, price, imgUrl, categoryId } = args;
      try {
        const { data } = await axios.put(`${BASE_URL_APP}/${id}`, {
          name,
          description,
          price,
          imgUrl,
          categoryId,
        });
        await redis.del("app:items");
        await redis.del("app:itemsAll");
        return data;

        // res.status(200).json(data);
      } catch (error) {
        console.log(error);
        // res.status(500).json(error);
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
