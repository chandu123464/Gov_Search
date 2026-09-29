import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }

  // On Vercel / AWS Lambda environments, the root file system is read-only.
  // SQLite requires write access for locking and journals.
  // We copy prisma/dev.db to the writable /tmp directory on cold start.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDbPath = path.join("/tmp", "dev.db");
    const candidatePaths = [
      path.join(process.cwd(), "prisma", "dev.db"),
      path.join(process.cwd(), "dev.db"),
      path.resolve("prisma", "dev.db"),
      path.resolve("dev.db"),
    ];

    try {
      if (!fs.existsSync(tmpDbPath)) {
        for (const candidate of candidatePaths) {
          if (fs.existsSync(candidate)) {
            fs.mkdirSync(path.dirname(tmpDbPath), { recursive: true });
            fs.copyFileSync(candidate, tmpDbPath);
            break;
          }
        }
      }
    } catch (err) {
      console.error("Error copying SQLite dev.db to /tmp:", err);
    }
    return `file:${tmpDbPath}`;
  }

  return `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
