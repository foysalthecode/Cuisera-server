/*
  Warnings:

  - Added the required column `status` to the `Meals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MealStatus" AS ENUM ('PUBLISHED', 'DRAFT', 'CANCELED');

-- AlterTable
ALTER TABLE "Meals" ADD COLUMN     "status" "MealStatus" NOT NULL;
