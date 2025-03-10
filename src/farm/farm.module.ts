import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';

@Module({
  imports: [DbModule],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule { }
