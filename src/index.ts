import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Query {
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "This is the API avo store",
  },
};

const listen = async (port?: number):Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: port || 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

listen();