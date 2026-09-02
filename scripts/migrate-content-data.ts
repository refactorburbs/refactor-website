/*
  One-off script to copy content data (SteamGame, JobPosting, JobApplication)
  from the OLD production database into the NEW staging database.

  Deliberately does NOT touch User/Session/Account/Verification/RecentActivity -
  those are a clean break per the auth rewrite, not transferred.

  Usage:
    npx tsx scripts/migrate-content-data.ts

  Run this with the .env's DATABASE_URL/DIRECT_DATABASE_URL already pointed at
  STAGING - this script opens a second, separate
  connection to OLD production for reading only. It never writes to production.
*/

import { Client } from "pg";
import prisma from "../lib/prisma"; // this uses your current staging DATABASE_URL

const OLD_DIRECT_URL = process.env.OLD_DIRECT_DATABASE_URL;

if (!OLD_DIRECT_URL) {
  throw new Error(
    "Set OLD_DIRECT_DATABASE_URL to the OLD production direct connection string before running this script."
  );
}

async function main() {
  const oldDb = new Client({ connectionString: OLD_DIRECT_URL });
  await oldDb.connect();

  try {
    // --- SteamGame ---
    const { rows: games } = await oldDb.query(`SELECT * FROM "SteamGame"`);
    console.log(`Found ${games.length} SteamGame rows in old production.`);

    for (const g of games) {
      await prisma.steamGame.upsert({
        where: { id: g.id },
        create: {
          id: g.id,
          steamId: g.steamId,
          name: g.name,
          storePage: g.storePage,
          createdAt: g.createdAt,
          updatedAt: g.updatedAt,
        },
        update: {},
      });
    }
    console.log("SteamGame copied.");

    // --- JobPosting (must come before JobApplication, FK dependency) ---
    const { rows: postings } = await oldDb.query(`SELECT * FROM "JobPosting"`);
    console.log(`Found ${postings.length} JobPosting rows in old production.`);

    for (const p of postings) {
      await prisma.jobPosting.upsert({
        where: { id: p.id },
        create: {
          id: p.id,
          title: p.title,
          summary: p.summary,
          tags: p.tags,
          aboutTheJob: p.aboutTheJob,
          experience: p.experience,
          responsibilities: p.responsibilities,
          requirements: p.requirements,
          pluses: p.pluses,
          delisted: p.delisted,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        },
        update: {},
      });
    }
    console.log("JobPosting copied.");

    // --- JobApplication ---
    const { rows: applications } = await oldDb.query(`SELECT * FROM "JobApplication"`);
    console.log(`Found ${applications.length} JobApplication rows in old production.`);

    for (const a of applications) {
      await prisma.jobApplication.upsert({
        where: { id: a.id },
        create: {
          id: a.id,
          firstName: a.firstName,
          lastName: a.lastName,
          email: a.email,
          location: a.location,
          salary: a.salary,
          startDate: a.startDate,
          portfolio: a.portfolio,
          linkedIn: a.linkedIn,
          other: a.other,
          resume: a.resume,
          starred: a.starred,
          jobPostingId: a.jobPostingId,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
        },
        update: {},
      });
    }
    console.log("JobApplication copied.");

    // --- Reset auto-increment sequences so future inserts don't collide ---
    await prisma.$executeRawUnsafe(`
      SELECT setval(pg_get_serial_sequence('steam_game', 'id'), COALESCE((SELECT MAX(id) FROM steam_game), 1));
    `);
    await prisma.$executeRawUnsafe(`
      SELECT setval(pg_get_serial_sequence('job_posting', 'id'), COALESCE((SELECT MAX(id) FROM job_posting), 1));
    `);
    await prisma.$executeRawUnsafe(`
      SELECT setval(pg_get_serial_sequence('job_application', 'id'), COALESCE((SELECT MAX(id) FROM job_application), 1));
    `);
    console.log("Sequences reset.");

    console.log("Done.");
  } finally {
    await oldDb.end();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));