import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import SuperHeroAPI from './graphql/dataSources/SuperHeroDataSource';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageProductionDefault({ footer: false }),
  ],
  dataSources: () => {
    return {
      superHeroApi: new SuperHeroAPI()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
