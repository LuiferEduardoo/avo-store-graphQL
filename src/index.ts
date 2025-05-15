import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import path from 'path'
import { readFileSync } from 'fs'

import resolvers from './resolvers';

const orm = new PrismaClient();
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')



const listen = async (port?: number):Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: port || 4000 },
    context: async () => ({
      orm,
    }),
  });

  console.log(`🚀  Server ready at: ${url}`);
};

listen();