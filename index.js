const { ApolloServer } = require("apollo-server"); // import ApolloServer from apollo-server
const { importSchema } = require("graphql-import"); // import importSchema from graphql-import
const EtherDataSource = require("./datasource/ethDatasource"); // import EtherDataSource class
const typeDefs = importSchema("./schema.graphql"); // import schema from schema.graphql file

require("dotenv").config(); // load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // resolver to get ether balance by address
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // resolver to get latest ethereum price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
}

const server = new ApolloServer({ // create ApolloServer instance
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // instantiate EtherDataSource
  }), 
});

server.timeout = 0; 
server.listen("9000").then(({ url }) => { // start server on port 9000
  console.log(`🚀 Server ready at ${url}`); 
});
