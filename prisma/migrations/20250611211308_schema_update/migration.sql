/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `JobApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "linkedIn" TEXT,
ADD COLUMN     "other" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_email_key" ON "JobApplication"("email");
