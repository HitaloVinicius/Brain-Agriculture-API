import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropService {
  private readonly logger = new Logger(CropService.name)
  constructor(private prisma: PrismaService) { }

  async create(createCropDto: CreateCropDto) {
    const harvest = await this.prisma.harvests.findUnique({
      where: { id: createCropDto.harvest_id }
    })
    if (!harvest) {
      this.logger.error('NotFoundException -- Safra não encontrada!')
      throw new NotFoundException('Safra não encontrada!')
    }

    const crop = await this.prisma.crops.create({
      data: createCropDto
    })
    this.logger.log('create -- Success')
    return {
      message: 'Cultura criada com sucesso!',
      cropId: crop.id,
      harvestId: harvest.id
    };
  }

  async findAll() {
    const result = await this.prisma.crops.findMany({
      select: {
        id: true,
        name: true
      },
    });
    this.logger.log('findAll -- Success')
    return result
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

    if (!crop) {
      this.logger.error('NotFoundException -- Cultura não encontrada!')
      throw new NotFoundException('Cultura não encontrada!')
    }
    this.logger.log('findOne -- Success')
    return crop
  }

  //TODO remover reutilização de findOne (Em todos os services)

  async update(id: string, updateCropDto: UpdateCropDto) {
    const cropExists = await this.findOne(id)
    if (!cropExists) {
      this.logger.error('NotFoundException -- Cultura não encontrada.')
      throw new NotFoundException('Cultura não encontrada.')
    }

    await this.prisma.crops.update({
      where: { id },
      data: updateCropDto
    })
    this.logger.log('update -- Success')
    return {
      message: 'Cultura editada com sucesso!',
      cropId: id,
    };
  }

  async remove(id: string) {
    const cropExists = await this.findOne(id)
    if (!cropExists) {
      this.logger.error('NotFoundException -- Cultura não encontrada.')
      throw new NotFoundException('Cultura não encontrada.')
    }

    await this.prisma.crops.delete({
      where: { id }
    })
    this.logger.log('remove -- Success')
    return {
      message: 'Cultura excluída com sucesso!',
      cropId: id,
    };
  }
}
