import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';

@Module({
  imports: [DbModule],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule { }
