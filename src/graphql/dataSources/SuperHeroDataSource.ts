import { RESTDataSource } from 'apollo-datasource-rest';
import { SuperHero } from '../../types';

class SuperHeroAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://akabab.github.io/superhero-api/api';
  }

  async listHeroes(): Promise<SuperHero[]> {
    return this.get(`all.json`);
  }

  async listSingleHero(id: number): Promise<SuperHero> {
    return this.get(`id/${id}.json`);
  }
}

export default SuperHeroAPI;
