import SuperHeroAPI from "../dataSources/SuperHeroDataSource";

export type DataSources = {
  superHeroApi: SuperHeroAPI;
};

export type ResolverContext = {
  dataSources: DataSources;
};
