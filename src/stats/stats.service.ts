import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name)
  constructor(private prisma: PrismaService) { }

  async getStats() {
    const totalFarms = await this.prisma.farms.count();
    const totalHectares = await this.prisma.farms.aggregate({
      _sum: { total_area: true },
    });

    const farmsByState = await this.prisma.farms.groupBy({
      by: ['state'],
      _count: { state: true },
    });

    const byCrop = await this.prisma.crops.groupBy({
      by: ['name'],
      _count: { name: true },
    });

    const farmUse = await this.prisma.farms.aggregate({
      _sum: { agricultural_area: true, vegetation_area: true, total_area: true },
    });

    const {
      agricultural_area,
      total_area,
      vegetation_area
    } = farmUse._sum

    return {
      totalFarms,
      totalHectares: totalHectares._sum.total_area,
      farmsByState,
      byCrop,
      landUse: {
        agricultural: farmUse._sum.agricultural_area,
        vegetation: farmUse._sum.vegetation_area,
        unmapped: Number(total_area) - (Number(agricultural_area) + Number(vegetation_area))
      },
    };
  }
}
