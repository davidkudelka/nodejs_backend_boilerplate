import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

async function init(app = express()) {
  const apolloServer = new ApolloServer({
    resolvers: resolvers,
    typeDefs: typeDefs,
    playground: true,
    introspection: true,
  });

  apolloServer.applyMiddleware({ app });

  return { app };
}

export default init;
