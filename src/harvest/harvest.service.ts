import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';

@Injectable()
export class HarvestService {
  constructor(private prisma: PrismaService) { }

  async create(createHarvestDto: CreateHarvestDto) {
    const farm = await this.prisma.farms.findUnique({
      where: { id: createHarvestDto.farm_id }
    })
    if (!farm) throw new NotFoundException('Fazenda não encontrada!')

    const harvest = await this.prisma.harvests.create({
      data: createHarvestDto
    })
    return {
      message: 'Safra criada com sucesso!',
      farmId: farm.id,
      harvestId: harvest.id
    };
  }

  async findAll() {
    return await this.prisma.harvests.findMany({
      select: {
        id: true,
        name: true
      },
    });
  }

  async findOne(id: string) {
    const harvest = await this.prisma.harvests.findUnique({
      where: { id },
      omit: {
        created_at: true,
        updated_at: true
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

    if (!harvest) throw new NotFoundException('Safra não encontrada!')
    return harvest
  }

  async update(id: string, updateHarvestDto: UpdateHarvestDto) {
    const harvestExists = await this.findOne(id)
    if (!harvestExists) throw new NotFoundException('Safra não encontrada.')

    await this.prisma.harvests.update({
      where: { id },
      data: updateHarvestDto
    })

    return {
      message: 'Safra editada com sucesso!',
      harvestId: id,
    };
  }

  async remove(id: string) {
    const harvestExists = await this.findOne(id)
    if (!harvestExists) throw new NotFoundException('Safra não encontrada.')

    await this.prisma.harvests.delete({
      where: { id }
    })

    return {
      message: 'Safra excluída com sucesso!',
      harvestId: id,
    };
  }
}
