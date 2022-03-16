import { SuperHero } from "../types";

class FakeDatabase {
  private heroes: SuperHero[];

  constructor() {
    this.heroes = [];
  }


  setHeroes(fetchedHeroes: SuperHero[]) {
    this.heroes = fetchedHeroes;
  }

  updateHeroes(newHero: SuperHero) {
    this.heroes = [...this.heroes, newHero];
  }

  getHeroes() {
    return this.heroes;
  }
}

export default FakeDatabase;
