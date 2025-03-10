import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { FindCropstDto } from './dto/find-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) { }

  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropService.create(createCropDto);
  }

  @Get()
  findAll() {
    return this.cropService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindCropstDto) {
    return this.cropService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindCropstDto, @Body() updateCropDto: UpdateCropDto) {
    return this.cropService.update(params.id, updateCropDto);
  }

  @Delete(':id')
  remove(@Param() params: FindCropstDto) {
    return this.cropService.remove(params.id);
  }
}
