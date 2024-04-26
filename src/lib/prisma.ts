import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

const prismaClientSingleton = () => {
  // console.log(process.env.DATABASE_URL);
  // const neon = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  // });
  // const adapter = new PrismaNeon(neon);

  //return new PrismaClient({ adapter });
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
