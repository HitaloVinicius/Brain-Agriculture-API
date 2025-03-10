import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from './farm.service';
import { PrismaService } from '../db/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

describe('FarmService', () => {
  let farmService: FarmService;

  const mockDb = [
    {
      id: '1c056972-442e-40e4-8071-568288c16020',
      name: 'Pitombeira'
    },
    {
      id: '42047e23-e3a4-47fb-86fe-8f173a9dec3f',
      name: 'Pandora'
    },
    {
      id: 'a875c358-af92-47c2-85ab-62ce411a19ab',
      name: 'Krypton'
    }
  ]

  const mockPrismaService = {
    farms: {
      create: jest.fn().mockReturnValue({ id: 'd7d5f12f-b486-443f-856d-162819c3d133' }),
      findMany: jest.fn().mockReturnValue(mockDb),
      findUnique: jest.fn().mockImplementation(({ where }) =>
        mockDb.find((element) => element.id === where.id)),
      update: jest.fn(),
      delete: jest.fn(),
    },
    producers: {
      findUnique: jest.fn().mockImplementation(({ where }) =>
        where.id === '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9'
          ? { id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9' } : null),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmService, {
        provide: PrismaService,
        useValue: mockPrismaService
      }],
    }).compile();

    farmService = module.get<FarmService>(FarmService);
  });

  it('should be defined', () => {
    expect(farmService).toBeDefined();
  });

  describe('findAll farms', () => {
    it('should be return all farms', async () => {
      const result = await farmService.findAll()
      expect(result).toEqual(mockDb)
    })

    it('should be return all farms with pagination', async () => {
      const spy = jest.spyOn(mockPrismaService.farms, 'findMany')
      await farmService.findAll(1, 2)
      expect(spy).toHaveBeenCalledWith({ "select": { "id": true, "name": true }, "skip": 0, "take": 2 })
    })
  })

  describe('findUnique farm', () => {
    it('should be return farm', async () => {
      const result = await farmService.findOne('1c056972-442e-40e4-8071-568288c16020')
      expect(result).toEqual(mockDb[0])
    })

    it('should throw NotFoundException if farm does not exist', async () => {
      const result = farmService.findOne('1c050000-0000-40e4-8071-568288c10000')
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })

  describe('create farm', () => {
    it('should be create producer', async () => {
      const data: CreateFarmDto = {
        producer_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9',
        name: 'Rancho Skywalker',
        city: 'Mossoró',
        state: 'RN',
        total_area: 100,
        vegetation_area: 30,
        agricultural_area: 70
      }
      const result = await farmService.create(data)
      expect(result).toEqual({
        message: 'Fazenda criada com sucesso!',
        producerId: data.producer_id,
        farmId: result.farmId
      })
    })

    it('should throw an error if area is invalid', async () => {
      const data: CreateFarmDto = {
        producer_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9',
        name: 'Rancho Skywalker',
        city: 'Mossoró',
        state: 'RN',
        total_area: 100,
        vegetation_area: 30,
        agricultural_area: 80
      }
      const result = farmService.create(data)
      await expect(result).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if producer_id is invalid', async () => {
      const data: CreateFarmDto = {
        producer_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a0',
        name: 'Rancho Skywalker',
        city: 'Mossoró',
        state: 'RN',
        total_area: 100,
        vegetation_area: 30,
        agricultural_area: 50
      }
      const result = farmService.create(data)
      await expect(result).rejects.toThrow(NotFoundException);
    });
  })

  describe('update farm', () => {
    it('should be update farm', async () => {
      const farmId = '1c056972-442e-40e4-8071-568288c16020'
      const data: UpdateFarmDto = {
        name: 'Rancho Asimov',
        city: 'Mossoró',
        state: 'RN',
        total_area: 100,
        vegetation_area: 30,
        agricultural_area: 50
      }
      const result = await farmService.update(farmId, data)
      expect(result).toEqual({
        message: 'Fazenda editada com sucesso!',
        farmId,
      })
    })

    it('should throw an error if id is invalid when updating farm', async () => {
      const data: UpdateFarmDto = {
        name: 'Rancho Asimov',
        city: 'Mossoró',
        state: 'RN',
        total_area: 100,
        vegetation_area: 30,
        agricultural_area: 50
      }
      const result = farmService.update('5d6ed613-f4b6-4c40-860f-7ca7d2be2286', data)
      await expect(result).rejects.toThrow(NotFoundException)
    })

    it('should throw an error if area is invalid when updating farm', async () => {
      const data: UpdateFarmDto = {
        name: 'Rancho Asimov',
        city: 'Mossoró',
        state: 'RN',
        total_area: 100,
        vegetation_area: 80,
        agricultural_area: 50
      }
      const result = farmService.update('5d6ed613-f4b6-4c40-860f-7ca7d2be2286', data)
      await expect(result).rejects.toThrow(BadRequestException)
    })
  })

  describe('remove farm', () => {
    it('should be delete farm', async () => {
      const farmId = '1c056972-442e-40e4-8071-568288c16020'
      const result = await farmService.remove(farmId)
      expect(result).toEqual({
        message: 'Fazenda excluída com sucesso!',
        farmId,
      })
    })

    it('should throw an error if id is invalid when deleting farm', async () => {
      const result = farmService.remove('1c056972-442e-40e4-8071-568288c16021')
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })
});