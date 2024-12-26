import { ApolloServer } from "@apollo/server";
import { Product } from "./product";
import { User } from "./user";

async function createApolloGraphqlServer() {
  const gqpServer = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
      ${Product.typeDefs}
      
      type Query {
        ${User.queries}
        ${Product.queries}
      }

      type Mutation {
        ${User.mutations}
        ${Product.mutations}
      }`,

    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Product.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Product.resolvers.mutations,
      },
    },
  });

  await gqpServer.start();

  return gqpServer;
}

export default createApolloGraphqlServer;
