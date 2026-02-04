/*
  Warnings:

  - You are about to drop the column `customerId` on the `Meals` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meals" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
