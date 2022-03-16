import { RESTDataSource } from 'apollo-datasource-rest';
import FakeDatabase from '../../db/FakeDatabase';
import { HeroPayloadCreate } from '../../types';

const database = new FakeDatabase();

class SuperHeroAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://akabab.github.io/superhero-api/api';
  }

  async handleGetHeroes() {
    try {
      let heroes = database.getHeroes();

      if (heroes.length === 0) {
        heroes = await this.get(`all.json`);
        database.setHeroes(heroes);
      }
      return heroes;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async listHeroes() {
    const heroes = await this.handleGetHeroes();

    return heroes;
  }

  async createHero(data: HeroPayloadCreate) {
    const heroes = await this.handleGetHeroes();

    const [lastHero] = heroes.slice(-1);

    const newId = lastHero.id + 1;
    const slug = `${newId}-${data.name.toLowerCase().replace(/\W+/g, '-')}`;

    const newHero = {
      id: newId,
      slug,
      ...data
    };

    database.updateHeroes(newHero);

    return newHero;
  }

}

export default SuperHeroAPI;
