/*
  Warnings:

  - You are about to drop the column `deleted` on the `Crops` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Farms` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Harvests` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Producers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Crops" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Farms" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Harvests" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Producers" DROP COLUMN "deleted";
