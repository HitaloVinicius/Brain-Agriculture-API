import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ProducerModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
