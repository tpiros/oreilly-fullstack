import { PrismaClient } from '@prisma/client';
import data from './data';
const prisma = new PrismaClient();

async function main() {
  await prisma.team.deleteMany();
  await prisma.player.deleteMany();
  await prisma.$queryRaw`ALTER SEQUENCE "public"."Player_id_seq" RESTART WITH 1;`;
  await prisma.$queryRaw`ALTER SEQUENCE "public"."Team_id_seq" RESTART WITH 1;`;

  data.map(async (team) => {
    try {
      const result = await prisma.team.create({
        data: {
          ...team,
          players: {
            createMany: {
              data: team.players,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
