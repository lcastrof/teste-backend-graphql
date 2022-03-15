import { ApolloError } from 'apollo-server';
import { ResolverContext } from './context';

const resolvers = {
  Query: {
    listHeroes: async (_: any, { limit, order }: { limit?: number, order?: string }, { dataSources }: ResolverContext) => {
      try {
        const heroes = await dataSources.superHeroApi.listHeroes();
        if (order) {
          const hero = heroes[0];
          const keys = Object.keys(hero);
  
          let isInnerKey = false;
          let outterAtribute = '';
          keys.forEach((key) => {
            if (hero[key][order]) {
              isInnerKey = true;
              outterAtribute = key;
            }
          });
  
          if (keys.includes(order)) {
            heroes.sort((heroA, heroB) => {
              if (heroA[order] > heroB[order]) return 1;
              if (heroA[order] < heroB[order]) return -1;
              return 0;
            });
          } else if (isInnerKey && outterAtribute) {
            heroes.sort((heroA, heroB) => {
              if (heroA[outterAtribute][order] > heroB[outterAtribute][order]) return 1;
              if (heroA[outterAtribute][order] < heroB[outterAtribute][order]) return -1;
              return 0;
            });
          } else {
            throw new ApolloError("The attribute passed in 'order' does not exist");
          }
        }
  
        if (limit) {
          const limitedHeroes = heroes.slice(0, limit);
          return limitedHeroes;
        }
  
        return heroes;
      } catch (err) {
        console.log({ err });
        throw err;
      }
    },
  }
}

export default resolvers;
