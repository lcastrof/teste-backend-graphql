import { ApolloError } from 'apollo-server';
import { HeroPayloadCreate, SearchFilter } from '../../types';
import { ResolverContext } from './context';

type ListHeroesParams = {
  limit?: number;
  order?: string;
};

type SearchHeroesParams = {
  query: string;
  filter?: SearchFilter;
};

type CreateHeroParams = {
  data: HeroPayloadCreate;
};

const resolvers = {
  Query: {
    listHeroes: async (_: any, { limit, order }: ListHeroesParams, { dataSources }: ResolverContext) => {
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
              if (heroA?.[order] > heroB?.[order]) return 1;
              if (heroA?.[order] < heroB?.[order]) return -1;
              return 0;
            });
          } else if (isInnerKey && outterAtribute) {
            heroes.sort((heroA, heroB) => {
              if (heroA[outterAtribute]?.[order] > heroB[outterAtribute]?.[order]) return 1;
              if (heroA[outterAtribute]?.[order] < heroB[outterAtribute]?.[order]) return -1;
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

    searchHeroes: async (_: any, { query, filter }: SearchHeroesParams, { dataSources }: ResolverContext) => {
      try {
        // Formatar a query para evitar ser case sensitive
        const formattedQuery = query.toLowerCase();
        const heroes = await dataSources.superHeroApi.listHeroes();

        const queriedHeroes = heroes.filter((hero) => {
          // Iterando por cada propriedade do herói
          for (const key in hero) {
            // Caso tenha um filtro e o atributo não seja o do filtro, passar verificação
            if (filter && key !== filter) continue;

            const attribute = hero[key];
            if (typeof attribute === 'string') {
              if (attribute.toLowerCase().includes(formattedQuery)) return true;
            }

            // Caso o atributo for um objeto, iterar em cima dele
            if (typeof attribute === 'object') {
              for (const attributeKey in attribute) {
                const attributeValue = attribute[attributeKey];
                if (typeof attributeValue === 'string') {
                  if (attributeValue.toLowerCase().includes(formattedQuery)) return true;
                }

                // Caso o atributo do atributo for um objeto ou array, iterar em cima dele novamente
                if (typeof attributeValue === 'object') {
                  let haveAttribute = false;
                  attributeValue?.forEach((value: string) => {
                    if (value.includes(query)) {
                      haveAttribute = true;
                    }
                  });
                  if (haveAttribute) return true;
                }
              }
            }
          }

          return false;
        });

        return queriedHeroes;
      } catch (err) {
        console.log({ err });
        throw err;
      }
    },
  },

  Mutation: {
    createHero: async (_: any, { data }: CreateHeroParams, { dataSources }: ResolverContext) => {
      try {
        const hero = await dataSources.superHeroApi.createHero(data);
        return hero;
      } catch (err) {
        console.log({ err });
        throw err;
      }
    },
  }
}

export default resolvers;
