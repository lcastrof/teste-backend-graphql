import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Images {
    xs: String
    sm: String
    md: String
    lg: String
  }

  type Connections {
    groupAffiliation: String
    relatives: String
  }

  type Work {
    occupation: String
    base: String
  }

  type Biography {
    fullName: String
    alterEgos: String
    placeOfBirth: String
    firstAppearance: String
    publisher: String
    alignment: String
    aliases: [String]
  }

  type Appearance {
    gender: String
    race: String
    eyeColor: String
    hairColor: String
    weight: [String]
    height: [String]
  }

  type Powerstats {
    intelligence: Int
    strength: Int
    speed: Int
    durability: Int
    power: Int
    combat: Int
  }

  type SuperHero {
    id: Int
    name: String
    slug: String
    images: Images
    connections: Connections
    work: Work
    biography: Biography
    appearance: Appearance
    powerstats: Powerstats
  }

  enum SearchFilter {
    name
    appearance
    biography
    work
    connections
  }

  type Query {
    listHeroes(limit: Int, order: String): [SuperHero]!
    getSingleHero(id: Int!): SuperHero!
    searchHeroes(query: String!, filter: SearchFilter): [SuperHero]
  }
`;

export default typeDefs;
