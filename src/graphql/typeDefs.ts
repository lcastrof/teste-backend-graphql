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

  input ImagesInput {
    xs: String
    sm: String
    md: String
    lg: String
  }

  input ConnectionsInput {
    groupAffiliation: String
    relatives: String
  }

  input WorkInput {
    occupation: String
    base: String
  }

  input BiographyInput {
    fullName: String
    alterEgos: String
    placeOfBirth: String
    firstAppearance: String
    publisher: String
    alignment: String
    aliases: [String]
  }

  input AppearanceInput {
    gender: String
    race: String
    eyeColor: String
    hairColor: String
    weight: [String]
    height: [String]
  }

  input PowerstatsInput {
    intelligence: Int
    strength: Int
    speed: Int
    durability: Int
    power: Int
    combat: Int
  }

  input HeroPayloadCreate {
    name: String!
    images: ImagesInput
    connections: ConnectionsInput
    work: WorkInput
    biography: BiographyInput
    appearance: AppearanceInput
    powerstats: PowerstatsInput
  }

  type Query {
    listHeroes(limit: Int, order: String): [SuperHero]!
    searchHeroes(query: String!, filter: SearchFilter): [SuperHero]
  }

  type Mutation {
    createHero(data: HeroPayloadCreate!): SuperHero!
  }
`;

export default typeDefs;
