import SuperHeroAPI from "../dataSources/SuperHeroDataSource";

export interface DataSources {
  superHeroApi: SuperHeroAPI;
};

export type ResolverContext = {
  dataSources: DataSources;
};
