/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Meals" DROP CONSTRAINT "Meals_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_customerId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "customerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Meals" ALTER COLUMN "customerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "customerId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Profile";
