import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { DbModule } from 'src/db/db.module';
import { ProducerService } from './producer.service';

@Module({
  imports: [DbModule],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule { }
