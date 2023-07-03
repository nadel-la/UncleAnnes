if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const [userTypeDefs, userResolvers] = require("./schemas/userSchemas");
const [appTypeDefs, appResolvers] = require("./schemas/itemSchemas");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, appTypeDefs],
  resolvers: [userResolvers, appResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
