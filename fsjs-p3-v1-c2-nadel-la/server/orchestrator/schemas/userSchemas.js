const Redis = require("ioredis");
const redis = new Redis({
  port: 18484, // Redis port
  host: "redis-18484.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
});

const axios = require("axios");
const BASE_URL_USERS = `http://user-service:4001/users`;

const typeDefs = `#graphql
  type User {
     # _id: String
      username: String
      email: String
      password: String
      role: String
      phoneNumber: String
      address: String
  }

  type Query {
    users: [User]
    user(_id: String): User
  }

  type Mutation{
    addUser(username: String, email:String, password: String, phoneNumber: String, address: String): User
    deleteUser(id: String) : String
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const usersCache = await redis.get("user:Allusers");
        let users;

        if (usersCache) {
          users = JSON.parse(usersCache);
        } else {
          const { data } = await axios.get(`${BASE_URL_USERS}`);
          await redis.set("user:users", JSON.stringify(data));
          users = data;
        }
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    user: async (_, args) => {
      const { _id } = args;
      console.log(args);
      try {
        const usersCache = await redis.get("user:users");
        let users;

        if (usersCache && usersCache === _id) {
          users = JSON.parse(usersCache);
        } else {
          const { data } = await axios.get(`${BASE_URL_USERS}/${_id}`);
          // console.log(data, "<< ini user");
          await redis.set("user:users", JSON.stringify(data));
          users = data;
        }
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { username, email, password, phoneNumber, address } = args;
        const { data } = await axios.post(`${BASE_URL_USERS}`, {
          username,
          email,
          password,
          phoneNumber,
          address,
        });
        await redis.del("user:users");
        await redis.del("user:Allusers");

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteUser: async (_, args) => {
      let { id } = args;
      try {
        const { data } = await axios.delete(`${BASE_URL_USERS}/${id}`);
        await redis.del("user:users");
        await redis.del("user:Allusers");

        // res.status(200).json(data);
        // console.log(data);
        return data.message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
