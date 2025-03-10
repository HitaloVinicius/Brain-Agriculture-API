import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';

@Injectable()
export class HarvestService {
  private readonly logger = new Logger(HarvestService.name)
  constructor(private prisma: PrismaService) { }

  async create(createHarvestDto: CreateHarvestDto) {
    const farm = await this.prisma.farms.findUnique({
      where: { id: createHarvestDto.farm_id }
    })
    if (!farm) {
      this.logger.error('NotFoundException -- Fazenda não encontrada!')
      throw new NotFoundException('Fazenda não encontrada!')
    }

    const harvest = await this.prisma.harvests.create({
      data: createHarvestDto
    })
    this.logger.log('create -- Success')
    return {
      message: 'Safra criada com sucesso!',
      farmId: farm.id,
      harvestId: harvest.id
    };
  }

  async findAll() {
    const result = await this.prisma.harvests.findMany({
      select: {
        id: true,
        name: true
      },
    });
    this.logger.log('findAll -- Success')
    return result
  }

  async findOne(id: string) {
    const harvest = await this.prisma.harvests.findUnique({
      where: { id },
      omit: {
        created_at: true,
        updated_at: true,
        farm_id: true
      },
      include: {
        crops: {
          select: {
            id: true,
            name: true
          }
        },
        farm: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!harvest) {
      this.logger.error('NotFoundException -- Safra não encontrada!')
      throw new NotFoundException('Safra não encontrada!')
    }
    this.logger.log('findOne -- Success')
    return harvest
  }

  async update(id: string, updateHarvestDto: UpdateHarvestDto) {
    const harvestExists = await this.findOne(id)
    if (!harvestExists) {
      this.logger.error('NotFoundException -- Safra não encontrada.')
      throw new NotFoundException('Safra não encontrada.')
    }

    await this.prisma.harvests.update({
      where: { id },
      data: updateHarvestDto
    })
    this.logger.log('update -- Success')
    return {
      message: 'Safra editada com sucesso!',
      harvestId: id,
    };
  }

  async remove(id: string) {
    const harvestExists = await this.findOne(id)
    if (!harvestExists) {
      this.logger.error('NotFoundException -- Safra não encontrada.')
      throw new NotFoundException('Safra não encontrada.')
    }

    await this.prisma.harvests.delete({
      where: { id }
    })
    this.logger.log('remove -- Success')
    return {
      message: 'Safra excluída com sucesso!',
      harvestId: id,
    };
  }
}
