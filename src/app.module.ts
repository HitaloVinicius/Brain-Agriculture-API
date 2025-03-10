import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { DbModule } from './db/db.module';
import { FarmModule } from './farm/farm.module';
import { HarvestModule } from './harvest/harvest.module';
import { CropModule } from './crop/crop.module';

@Module({
  imports: [ProducerModule, DbModule, FarmModule, HarvestModule, CropModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
