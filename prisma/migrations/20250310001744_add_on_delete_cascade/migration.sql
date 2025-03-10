-- DropForeignKey
ALTER TABLE "Crops" DROP CONSTRAINT "Crops_harvest_id_fkey";

-- DropForeignKey
ALTER TABLE "Farms" DROP CONSTRAINT "Farms_producer_id_fkey";

-- DropForeignKey
ALTER TABLE "Harvests" DROP CONSTRAINT "Harvests_farm_id_fkey";

-- AddForeignKey
ALTER TABLE "Farms" ADD CONSTRAINT "Farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "Producers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvests" ADD CONSTRAINT "Harvests_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "Farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crops" ADD CONSTRAINT "Crops_harvest_id_fkey" FOREIGN KEY ("harvest_id") REFERENCES "Harvests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
