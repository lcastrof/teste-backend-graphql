import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import SuperHeroAPI from './graphql/dataSources/SuperHeroDataSource';

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  dataSources: () => { 
    return {
      superHeroApi: new SuperHeroAPI()
    };
}});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
