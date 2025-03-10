import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { GetProducerDto } from './dto/get-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerService } from './producer.service';
import { FindProducerDto } from './dto/find-producer.dto';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) { }

  @Post()
  async create(@Body() producer: CreateProducerDto) {
    return this.producerService.create(producer)
  }

  @Get()
  async findAll(
    @Query() params: GetProducerDto
  ) {
    return this.producerService.findAll(
      params.page,
      params.per_page
    );
  }

  @Get(':id')
  async findOne(@Param() params: FindProducerDto) {
    return this.producerService.findOne(params.id)
  }

  @Patch(':id')
  async update(@Param() params: FindProducerDto, @Body() producer: UpdateProducerDto) {
    return this.producerService.update(params.id, producer)
  }

  @Delete(':id')
  async remove(@Param() params: FindProducerDto) {
    return this.producerService.remove(params.id)
  }
}