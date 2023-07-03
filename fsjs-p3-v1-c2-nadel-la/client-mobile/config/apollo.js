import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://uncleannes.kasfi.site/",
  cache: new InMemoryCache(),
});

module.exports = client;
