/*
  Warnings:

  - You are about to drop the column `detailedDescription` on the `JobPosting` table. All the data in the column will be lost.
  - You are about to drop the column `qualifications` on the `JobPosting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobPosting" DROP COLUMN "detailedDescription",
DROP COLUMN "qualifications",
ADD COLUMN     "aboutTheJob" TEXT,
ADD COLUMN     "experience" TEXT[],
ADD COLUMN     "pluses" TEXT[],
ADD COLUMN     "requirements" TEXT[];
