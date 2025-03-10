import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { DbModule } from './db/db.module';
import { FarmModule } from './farm/farm.module';
import { HarvestModule } from './harvest/harvest.module';

@Module({
  imports: [ProducerModule, DbModule, FarmModule, HarvestModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
