import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

//for prvent hotReload (every time we change and save a file in development) to create a bunch of
// PrismaClient instances and stores it in global object(not affected by hot reload). In production
//hot reload never happens so is no need it (thats why de if statment)
export const prisma_db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production' && globalThis.prisma == null) globalThis.prisma = prisma_db;
