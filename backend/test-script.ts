import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const prisma = new PrismaClient();
  const devices = await prisma.device.findMany({ include: { breakers: true } });
  console.log(JSON.stringify(devices, null, 2));
  await prisma.$disconnect();
}

main().catch(console.error);
