import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { GetProducerDto } from './dto/get-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerService } from './producer.service';

@Controller('produtor')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) { }

  @Get()
  async findAll(
    @Query() params: GetProducerDto
  ) {
    return this.producerService.getProducers(
      params.page,
      params.per_page
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.producerService.findProducer(id)
  }

  @Post()
  async create(@Body() producer: CreateProducerDto) {
    return this.producerService.createProducer(producer)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() producer: UpdateProducerDto) {
    return this.producerService.updateProducer(id, producer)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.producerService.deleteProducer(id)
  }
}