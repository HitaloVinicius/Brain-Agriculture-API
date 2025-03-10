import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../db/prisma.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { HarvestService } from './harvest.service';

describe('HarvestService', () => {
  let harvestService: HarvestService;

  const mockDb = [
    {
      id: '1c056972-442e-40e4-8071-568288c16020',
      name: 'Safra 2023'
    },
    {
      id: '42047e23-e3a4-47fb-86fe-8f173a9dec3f',
      name: 'Safra 2024'
    },
    {
      id: 'a875c358-af92-47c2-85ab-62ce411a19ab',
      name: 'Safra 2025'
    }
  ]

  const mockPrismaService = {
    harvests: {
      create: jest.fn().mockReturnValue({ id: 'd7d5f12f-b486-443f-856d-162819c3d133' }),
      findMany: jest.fn().mockReturnValue(mockDb),
      findUnique: jest.fn().mockImplementation(({ where }) =>
        mockDb.find((element) => element.id === where.id)),
      update: jest.fn(),
      delete: jest.fn(),
    },
    farms: {
      findUnique: jest.fn().mockImplementation(({ where }) =>
        where.id === '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9'
          ? { id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9' } : null),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarvestService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
        }],
    }).compile();

    harvestService = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(harvestService).toBeDefined();
  });

  describe('findAll harvests', () => {
    it('should be return all harvests', async () => {
      const result = await harvestService.findAll()
      expect(result).toEqual(mockDb)
    })
  })

  describe('findUnique harvest', () => {
    it('should be return harvest', async () => {
      const result = await harvestService.findOne('1c056972-442e-40e4-8071-568288c16020')
      expect(result).toEqual(mockDb[0])
    })

    it('should throw NotFoundException if harvest does not exist', async () => {
      const result = harvestService.findOne('1c050000-0000-40e4-8071-568288c10000')
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })

  describe('create harvest', () => {
    it('should be create harvest', async () => {
      const data: CreateHarvestDto = {
        farm_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9',
        name: 'Safra 2025',
      }
      const result = await harvestService.create(data)
      expect(result).toEqual({
        message: 'Safra criada com sucesso!',
        farmId: result.farmId,
        harvestId: result.harvestId
      })
    })

    it('should throw an error if farm_id is invalid', async () => {
      const data: CreateHarvestDto = {
        farm_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a0',
        name: 'Safra 2025'
      }
      const result = harvestService.create(data)
      await expect(result).rejects.toThrow(NotFoundException);
    });
  })

  describe('update harvest', () => {
    it('should be update harvest', async () => {
      const harvestId = '1c056972-442e-40e4-8071-568288c16020'
      const data: UpdateHarvestDto = {
        name: 'Safra 2024',
      }
      const result = await harvestService.update(harvestId, data)
      expect(result).toEqual({
        message: 'Safra editada com sucesso!',
        harvestId,
      })
    })

    it('should throw an error if id is invalid when updating harvest', async () => {
      const data: UpdateHarvestDto = {
        name: 'Safra 2024',
      }
      const result = harvestService.update('5d6ed613-f4b6-4c40-860f-7ca7d2be2286', data)
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })

  describe('remove harvest', () => {
    it('should be delete harvest', async () => {
      const harvestId = '1c056972-442e-40e4-8071-568288c16020'
      const result = await harvestService.remove(harvestId)
      expect(result).toEqual({
        message: 'Safra excluída com sucesso!',
        harvestId,
      })
    })

    it('should throw an error if id is invalid when deleting harvest', async () => {
      const result = harvestService.remove('1c056972-442e-40e4-8071-568288c16021')
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })
});
