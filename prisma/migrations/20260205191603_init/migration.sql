/*
  Warnings:

  - The values [RECIVED,PACKING] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Meals` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `session` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `Meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "customerStatus" AS ENUM ('ACTIVE', 'STALLED');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('CANCEL', 'PREPARING', 'READY', 'DELIVERD');
ALTER TABLE "public"."Orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Orders" ALTER COLUMN "status" SET DEFAULT 'PREPARING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Meals" DROP CONSTRAINT "Meals_userId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropIndex
DROP INDEX "account_userId_idx";

-- DropIndex
DROP INDEX "session_userId_idx";

-- AlterTable
ALTER TABLE "Meals" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PREPARING';

-- AlterTable
ALTER TABLE "account" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "CUSTOMER" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT DEFAULT 'CUSTOMER',
    "phone" TEXT,
    "status" "customerStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "CUSTOMER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CUSTOMER_email_key" ON "CUSTOMER"("email");

-- CreateIndex
CREATE INDEX "account_customerId_idx" ON "account"("customerId");

-- CreateIndex
CREATE INDEX "session_customerId_idx" ON "session"("customerId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CUSTOMER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CUSTOMER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CUSTOMER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CUSTOMER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CUSTOMER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
