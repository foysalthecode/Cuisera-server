/*
  Warnings:

  - Added the required column `price` to the `Meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meals" ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
