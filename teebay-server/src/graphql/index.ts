import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
  const gqpServer = new ApolloServer({
    typeDefs: User.typeDefs,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await gqpServer.start();

  return gqpServer;
}

export default createApolloGraphqlServer;
