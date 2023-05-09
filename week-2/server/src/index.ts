import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient, Player, Team } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `
type Team {
  id: Int
  name: String
  stadium: String
  country: String
  city: String
  players: [Player]
}

type Player {
  id: Int
  name: String
  number: Int
  age: Int
  team: Team
}

type Query {
  teams: [Team]
  team(id: Int!): Team
  players: [Player]
  player(id: Int!): Player
}
`;

const resolvers = {
  Query: {
    teams: () => {
      return prisma.team.findMany();
    },
    team: (parent: Team, { id }: { id: number }) => {
      return prisma.team.findUnique({
        where: {
          id,
        },
      });
    },
    players: () => {
      return prisma.player.findMany();
    },
    player: (parent: Team, { id }: { id: number }) => {
      return prisma.player.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Team: {
    players: (parent: Team) => {
      return prisma.player.findMany({
        where: {
          teamId: parent.id,
        },
      });
    },
  },
  Player: {
    team: (parent: Player) => {
      return prisma.team.findUnique({
        where: {
          id: parent.teamId,
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = Number.parseInt(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log(`🚀  Server ready at: ${url}`);
