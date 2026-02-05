-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('RECIVED', 'PACKING', 'DELIVERD');

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'RECIVED';
