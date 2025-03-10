import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { GetFarmDto } from './dto/get-farm.dto';
import { FindFarmDto } from './dto/find-farm.dto';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) { }

  @Post()
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmService.create(createFarmDto);
  }

  @Get()
  async findAll(
    @Query() params: GetFarmDto
  ) {
    return this.farmService.findAll(
      params.page,
      params.per_page
    );
  }

  @Get(':id')
  findOne(@Param() params: FindFarmDto) {
    return this.farmService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindFarmDto, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.update(params.id, updateFarmDto);
  }

  @Delete(':id')
  remove(@Param() params: FindFarmDto) {
    return this.farmService.remove(params.id);
  }
}
