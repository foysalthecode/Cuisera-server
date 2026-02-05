/*
  Warnings:

  - You are about to drop the column `customerId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Meals` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `session` table. All the data in the column will be lost.
  - The `status` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('ACTIVE', 'STALLED');

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Meals" DROP CONSTRAINT "Meals_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_customerId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_customerId_fkey";

-- DropIndex
DROP INDEX "Feedback_customerId_idx";

-- DropIndex
DROP INDEX "account_customerId_idx";

-- DropIndex
DROP INDEX "session_customerId_idx";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meals" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "account" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER',
DROP COLUMN "status",
ADD COLUMN     "status" "userStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "Feedback_userId_idx" ON "Feedback"("userId");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
