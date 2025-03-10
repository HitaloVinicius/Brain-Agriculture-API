import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { FindHarvestDto } from './dto/find-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { HarvestService } from './harvest.service';

@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) { }

  @Post()
  create(@Body() createHarvestDto: CreateHarvestDto) {
    return this.harvestService.create(createHarvestDto);
  }

  @Get()
  findAll() {
    return this.harvestService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindHarvestDto) {
    return this.harvestService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindHarvestDto, @Body() updateHarvestDto: UpdateHarvestDto) {
    return this.harvestService.update(params.id, updateHarvestDto);
  }

  @Delete(':id')
  remove(@Param() params: FindHarvestDto) {
    return this.harvestService.remove(params.id);
  }
}
