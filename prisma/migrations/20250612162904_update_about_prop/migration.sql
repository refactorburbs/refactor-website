/*
  Warnings:

  - The `aboutTheJob` column on the `JobPosting` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "JobPosting" DROP COLUMN "aboutTheJob",
ADD COLUMN     "aboutTheJob" TEXT[];
