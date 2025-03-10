import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropService {
  constructor(private prisma: PrismaService) { }

  async create(createCropDto: CreateCropDto) {
    const harvest = await this.prisma.harvests.findUnique({
      where: { id: createCropDto.harvest_id }
    })
    if (!harvest) throw new NotFoundException('Safra não encontrada!')

    const crop = await this.prisma.crops.create({
      data: createCropDto
    })
    return {
      message: 'Cultura criada com sucesso!',
      cropId: crop.id,
      harvestId: harvest.id
    };
  }

  async findAll() {
    return await this.prisma.crops.findMany({
      select: {
        id: true,
        name: true
      },
    });
  }

  async findOne(id: string) {
    const crop = await this.prisma.crops.findUnique({
      where: { id },
      omit: {
        created_at: true,
        updated_at: true,
        harvest_id: true
      },
      include: {
        harvest: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!crop) throw new NotFoundException('Cultura não encontrada!')
    return crop
  }


  async update(id: string, updateCropDto: UpdateCropDto) {
    const cropExists = await this.findOne(id)
    if (!cropExists) throw new NotFoundException('Cultura não encontrada.')

    await this.prisma.crops.update({
      where: { id },
      data: updateCropDto
    })

    return {
      message: 'Cultura editada com sucesso!',
      cropId: id,
    };
  }

  async remove(id: string) {
    const cropExists = await this.findOne(id)
    if (!cropExists) throw new NotFoundException('Cultura não encontrada.')

    await this.prisma.crops.delete({
      where: { id }
    })

    return {
      message: 'Cultura excluída com sucesso!',
      cropId: id,
    };
  }
}
