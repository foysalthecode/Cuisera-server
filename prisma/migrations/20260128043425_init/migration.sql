/*
  Warnings:

  - You are about to drop the column `authorId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'CUSTOMER', 'PROVIDER');

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_authorId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "mealId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "review" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "mealId" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meals" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "review" TEXT,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_customerId_key" ON "Profile"("customerId");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
