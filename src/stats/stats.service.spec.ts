import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../db/prisma.service';
import { StatsService } from './stats.service';

describe('StatsService', () => {
  let statsService: StatsService;

  const mockPrismaService = {
    farms: {
      aggregate: jest.fn().mockImplementation((params) => {
        if (params._sum && !params._sum.total_area) {
          return {
            _sum: {
              total_area: 450
            }
          }
        } else {
          return {
            _sum: {
              agricultural_area: 200,
              vegetation_area: 200,
              total_area: 450
            }
          }
        }

      }),
      groupBy: jest.fn().mockReturnValue([
        {
          _count: {
            state: 1
          },
          state: 'RN'
        },
        {
          _count: {
            state: 2
          },
          state: 'PB'
        },
        {
          _count: {
            state: 1
          },
          state: 'SP'
        }
      ]),
      count: jest.fn().mockReturnValue(4)
    },
    crops: {
      groupBy: jest.fn().mockReturnValue([
        {
          _count: {
            name: 1
          },
          name: 'Arroz'
        },
        {
          _count: {
            name: 1
          },
          name: 'Soja'
        },
        {
          _count: {
            name: 3
          },
          name: 'Milho'
        }
      ])
    }
  };

  const mockResult = {
    totalFarms: 4,
    totalHectares: 450,
    farmsByState: [
      {
        _count: {
          state: 1
        },
        state: 'RN'
      },
      {
        _count: {
          state: 2
        },
        state: 'PB'
      },
      {
        _count: {
          state: 1
        },
        state: 'SP'
      }
    ],
    byCrop: [
      {
        _count: {
          name: 1
        },
        name: 'Arroz'
      },
      {
        _count: {
          name: 1
        },
        name: 'Soja'
      },
      {
        _count: {
          name: 3
        },
        name: 'Milho'
      }
    ],
    landUse: {
      agricultural: 200,
      vegetation: 200,
      unmapped: 50
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatsService, {
        provide: PrismaService,
        useValue: mockPrismaService
      }],
    }).compile();

    statsService = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(statsService).toBeDefined();
  });

  it('should be return stats', async () => {
    const result = await statsService.getStats()
    expect(result).toEqual(mockResult)
  })
});