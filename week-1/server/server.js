import dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify();
await fastify.register(cors);
dotenv.config();

const prisma = new PrismaClient();

fastify.get('/manufacturers', async () => {
  return await prisma.manufacturer.findMany();
});

fastify.get('/manufacturers/:id', async (request, response) => {
  const manufacturer = await prisma.manufacturer.findUnique({
    where: {
      id: request.params.id,
    },
  });

  if (manufacturer) {
    const models = await prisma.car.findMany({
      where: {
        manufacturerId: manufacturer.id,
      },
      select: {
        id: true,
        model: true,
      },
    });

    return {
      ...manufacturer,
      models,
    };
  } else {
    return response
      .code(404)
      .send({ error: `Manufacturer with id ${request.params.id} not found.` });
  }
});

fastify.post('/manufacturers', async (request) => {
  await prisma.manufacturer.create({
    data: request.body,
  });
});

fastify.post('/manufacturers/:id/model', async (request) => {
  const manufacturer = await prisma.manufacturer.findUnique({
    where: {
      id: request.params.id,
    },
  });
  if (request.body.model && manufacturer) {
    return await prisma.car.create({
      data: {
        model: request.body.model,
        manufacturerId: manufacturer.id,
      },
    });
  }
});

fastify.put('/manufacturers/:id', async (request) => {
  const manufacturer = await prisma.manufacturer.findUnique({
    where: {
      id: request.params.id,
    },
  });
  const updatedData = Object.assign(manufacturer, request.body);
  console.log(updatedData);
  return await prisma.manufacturer.update({
    where: {
      id: request.params.id,
    },
    data: {
      ...updatedData,
    },
  });
});

fastify.delete('/manufacturers/:id', async (request) => {
  return await prisma.manufacturer.delete({ where: { id: request.params.id } });
});

const serverOptions = {
  port: process.env.port || 3000,
};

fastify.listen(serverOptions);
