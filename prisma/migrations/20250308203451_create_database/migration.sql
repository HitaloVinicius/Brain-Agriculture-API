-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateTable
CREATE TABLE "Producers" (
    "id" UUID NOT NULL,
    "document" TEXT NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farms" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area" DOUBLE PRECISION NOT NULL,
    "agricultural_area" DOUBLE PRECISION NOT NULL,
    "vegetation_area" DOUBLE PRECISION NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "producer_id" UUID NOT NULL,

    CONSTRAINT "Farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Harvests" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "farm_id" UUID NOT NULL,

    CONSTRAINT "Harvests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crops" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "harvest_id" UUID NOT NULL,

    CONSTRAINT "Crops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producers_document_key" ON "Producers"("document");

-- AddForeignKey
ALTER TABLE "Farms" ADD CONSTRAINT "Farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "Producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvests" ADD CONSTRAINT "Harvests_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "Farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crops" ADD CONSTRAINT "Crops_harvest_id_fkey" FOREIGN KEY ("harvest_id") REFERENCES "Harvests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
