import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../db/prisma.service';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

describe('CropService', () => {
  let cropService: CropService;

  const mockDb = [
    {
      id: '1c056972-442e-40e4-8071-568288c16020',
      name: 'Milho'
    },
    {
      id: '42047e23-e3a4-47fb-86fe-8f173a9dec3f',
      name: 'Soja'
    },
    {
      id: 'a875c358-af92-47c2-85ab-62ce411a19ab',
      name: 'Café'
    }
  ]

  const mockPrismaService = {
    crops: {
      create: jest.fn().mockReturnValue({ id: 'd7d5f12f-b486-443f-856d-162819c3d133' }),
      findMany: jest.fn().mockReturnValue(mockDb),
      findUnique: jest.fn().mockImplementation(({ where }) =>
        mockDb.find((element) => element.id === where.id)),
      update: jest.fn(),
      delete: jest.fn(),
    },
    harvests: {
      findUnique: jest.fn().mockImplementation(({ where }) =>
        where.id === '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9'
          ? { id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9' } : null),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropService, {
        provide: PrismaService,
        useValue: mockPrismaService
      }],
    }).compile();

    cropService = module.get<CropService>(CropService);
  });

  it('should be defined', () => {
    expect(cropService).toBeDefined();
  });


  describe('findAll crops', () => {
    it('should be return all crops', async () => {
      const result = await cropService.findAll()
      expect(result).toEqual(mockDb)
    })
  })

  describe('findUnique crop', () => {
    it('should be return crop', async () => {
      const result = await cropService.findOne('1c056972-442e-40e4-8071-568288c16020')
      expect(result).toEqual(mockDb[0])
    })

    it('should throw NotFoundException if crop does not exist', async () => {
      const result = cropService.findOne('1c050000-0000-40e4-8071-568288c10000')
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })

  describe('create crop', () => {
    it('should be create crop', async () => {
      const data: CreateCropDto = {
        harvest_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9',
        name: 'Feijão',
      }
      const result = await cropService.create(data)
      expect(result).toEqual({
        message: 'Cultura criada com sucesso!',
        cropId: result.cropId,
        harvestId: result.harvestId
      })
    })

    it('should throw an error if harvest_id is invalid', async () => {
      const data: CreateCropDto = {
        harvest_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a0',
        name: 'Safra 2025'
      }
      const result = cropService.create(data)
      await expect(result).rejects.toThrow(NotFoundException);
    });
  })

  describe('update crop', () => {
    it('should be update crop', async () => {
      const cropId = '1c056972-442e-40e4-8071-568288c16020'
      const data: UpdateCropDto = {
        name: 'Feijão',
      }
      const result = await cropService.update(cropId, data)
      expect(result).toEqual({
        message: 'Cultura editada com sucesso!',
        cropId,
      })
    })

    it('should throw an error if id is invalid when updating crop', async () => {
      const data: UpdateCropDto = {
        name: 'Feijão',
      }
      const result = cropService.update('5d6ed613-f4b6-4c40-860f-7ca7d2be2286', data)
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })

  describe('remove crop', () => {
    it('should be delete crop', async () => {
      const cropId = '1c056972-442e-40e4-8071-568288c16020'
      const result = await cropService.remove(cropId)
      expect(result).toEqual({
        message: 'Cultura excluída com sucesso!',
        cropId,
      })
    })

    it('should throw an error if id is invalid when deleting crop', async () => {
      const result = cropService.remove('1c056972-442e-40e4-8071-568288c16021')
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })
});