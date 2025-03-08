import { Module } from '@nestjs/common';
import { ProdutorModule } from './produtor/produtor.module';

@Module({
  imports: [ProdutorModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
