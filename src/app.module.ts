import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { DbModule } from './db/db.module';
import { FarmModule } from './farm/farm.module';

@Module({
  imports: [ProducerModule, DbModule, FarmModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
