import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class FarmService {
  constructor(private prisma: PrismaService) { }
  //TODO add enum nos estados
  async create(createFarmDto: CreateFarmDto) {
    const { total_area, agricultural_area, vegetation_area } = createFarmDto
    if (total_area < agricultural_area + vegetation_area)
      throw new BadRequestException('A área total deve ser maior ou igual à soma das áreas agrícola e de vegetação')

    const producer = await this.prisma.producers.findUnique({
      where: { id: createFarmDto.producer_id }
    })

    if (!producer) throw new NotFoundException('Produtor não encontrado')

    const farm = await this.prisma.farms.create({
      data: createFarmDto
    })

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
    return await this.prisma.farms.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true
      },
    });
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
    if (!farm) throw new NotFoundException('Fazenda não encontrada!')
    return farm
  }

  async update(id: string, updateFarmDto: UpdateFarmDto) {
    const { total_area, agricultural_area, vegetation_area } = updateFarmDto
    if (total_area < agricultural_area + vegetation_area)
      throw new BadRequestException('A área total deve ser maior ou igual à soma das áreas agrícola e de vegetação')

    const farmExists = await this.findOne(id)
    if (!farmExists) throw new NotFoundException('Fazenda não encontrada.')

    await this.prisma.farms.update({
      where: { id },
      data: updateFarmDto
    })

    return {
      message: 'Fazenda editada com sucesso!',
      farmId: id,
    };
  }

  async remove(id: string) {
    const farmExists = await this.findOne(id)
    if (!farmExists) throw new NotFoundException('Fazenda não encontrada!')

    await this.prisma.farms.delete({
      where: { id }
    })

    return {
      message: 'Fazenda excluída com sucesso!',
      farmId: id,
    };
  }
}
