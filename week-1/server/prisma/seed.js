import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.manufacturer.deleteMany();
  await prisma.car.deleteMany();

  // model Manufacturer {
  //   id String @id @default(uuid())
  //   name String
  //   headquarters String
  //   established String @db.VarChar(4)
  //   cars Car[]
  // }

  // model Car {
  //   id String @id @default(uuid())
  //   name String
  //   manufacturerId String
  //   manufacturer Manufacturer @relation(fields:[manufacturerId], references: [id], onDelete: Cascade)
  // }

  const ford = await prisma.manufacturer.create({
    data: {
      name: 'Ford',
      headquarters: 'Dearborn, Michigan, USA',
      established: '1903',
    },
  });

  const toyota = await prisma.manufacturer.create({
    data: {
      name: 'Toyota',
      headquarters: 'Toyota city, Aichi, Japan',
      established: '1937',
    },
  });
  // Cars
  await prisma.car.create({
    data: {
      model: 'Fiesta',
      manufacturerId: ford.id,
    },
  });
  await prisma.car.create({
    data: {
      model: 'Mustang',
      manufacturerId: ford.id,
    },
  });

  await prisma.car.create({
    data: {
      model: 'Camry',
      manufacturerId: toyota.id,
    },
  });

  await prisma.car.create({
    data: {
      model: 'Yaris',
      manufacturerId: toyota.id,
    },
  });
}

seed();
