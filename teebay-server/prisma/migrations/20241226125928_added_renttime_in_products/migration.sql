-- CreateEnum
CREATE TYPE "RentTime" AS ENUM ('DAY', 'WEEK', 'MONTH');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "rent_time" "RentTime";
