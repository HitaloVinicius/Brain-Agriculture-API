import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Injectable()
export class FarmService {
  private readonly logger = new Logger(FarmService.name)
  constructor(private prisma: PrismaService) { }

  //TODO add enum nos estados
  async create(createFarmDto: CreateFarmDto) {
    const { total_area, agricultural_area, vegetation_area } = createFarmDto
    if (total_area < agricultural_area + vegetation_area) {
      this.logger.error('BadRequestException -- A área total deve ser maior ou igual à soma das áreas agrícola e de vegetação')
      throw new BadRequestException('A área total deve ser maior ou igual à soma das áreas agrícola e de vegetação')
    }

    const producer = await this.prisma.producers.findUnique({
      where: { id: createFarmDto.producer_id }
    })

    if (!producer) {
      this.logger.error('NotFoundException -- Produtor não encontrado')
      throw new NotFoundException('Produtor não encontrado')
    }

    const farm = await this.prisma.farms.create({
      data: createFarmDto
    })
    this.logger.log('create -- Success')
    return {
      message: 'Fazenda criada com sucesso!',
      farmId: farm.id,
      producerId: producer.id
    };
  }

  async findAll(
    page: number = 1,
    perPage: number = 10
  ) {
    const result = await this.prisma.farms.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true
      },
    });
    this.logger.log('findAll -- Success')
    return result
  }

  async findOne(id: string) {
    const farm = await this.prisma.farms.findUnique({
      where: { id },
      omit: {
        producer_id: true,
        created_at: true,
        updated_at: true
      },
      include: {
        producer: {
          select: {
            id: true,
            name: true
          }
        },
        harvests: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    if (!farm) {
      this.logger.error('NotFoundException -- Fazenda não encontrada!')
      throw new NotFoundException('Fazenda não encontrada!')
    }
    this.logger.log('findOne -- Success')
    return farm
  }

  async update(id: string, updateFarmDto: UpdateFarmDto) {
    const { total_area, agricultural_area, vegetation_area } = updateFarmDto
    if (total_area < agricultural_area + vegetation_area) {
      this.logger.error('BadRequestException -- A área total deve ser maior ou igual à soma das áreas agrícola e de vegetação')
      throw new BadRequestException('A área total deve ser maior ou igual à soma das áreas agrícola e de vegetação')
    }
    const farmExists = await this.findOne(id)
    if (!farmExists) {
      this.logger.error('NotFoundException -- Fazenda não encontrada.')
      throw new NotFoundException('Fazenda não encontrada.')
    }

    await this.prisma.farms.update({
      where: { id },
      data: updateFarmDto
    })
    this.logger.log('update -- Success')
    return {
      message: 'Fazenda editada com sucesso!',
      farmId: id,
    };
  }

  async remove(id: string) {
    const farmExists = await this.findOne(id)
    if (!farmExists) {
      this.logger.error('NotFoundException -- Fazenda não encontrada.')
      throw new NotFoundException('Fazenda não encontrada.')
    }

    await this.prisma.farms.delete({
      where: { id }
    })
    this.logger.log('remove -- Success')
    return {
      message: 'Fazenda excluída com sucesso!',
      farmId: id,
    };
  }
}
