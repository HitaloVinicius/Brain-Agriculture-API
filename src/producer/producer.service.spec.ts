import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../db/prisma.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerService } from './producer.service';

describe('ProducerService', () => {
  let producerService: ProducerService;

  const mockDb = [{
    id: '6752b1b0-2464-47d4-a0d3-c399141e5943',
    name: 'Leonard Hofstadter',
    document: '48435103000100',
    document_type: 'CNPJ'
  },
  {
    id: '42452ab2-e50a-4ed0-9cce-613a6d51851d',
    name: 'Howard Wolowitz',
    document: '28100581000152',
    document_type: 'CNPJ',
  },
  {
    id: 'b6957288-337f-49e7-b0af-c8d560451fa1',
    name: 'Rajesh Koothrappali',
    document: '97352726012',
    document_type: 'CPF',
  }]

  const mockPrismaService = {
    producers: {
      create: jest.fn().mockReturnValue({ id: 'd7d5f12f-b486-443f-856d-162819c3d133' }),
      findMany: jest.fn().mockReturnValue(mockDb),
      findUnique: jest.fn().mockImplementation(({ where }) => mockDb.find((element) => (element.id === where.id || element.document === where.document))),
      update: jest.fn(),
      delete: jest.fn(),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducerService, {
        provide: PrismaService,
        useValue: mockPrismaService
      }],
    }).compile();

    producerService = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(producerService).toBeDefined();
  });

  describe('getProducers', () => {
    it('should be return all producers', async () => {
      const result = await producerService.findAll()
      expect(result).toEqual(mockDb)
    })

    it('should be return all producers with pagination', async () => {
      const spy = jest.spyOn(mockPrismaService.producers, 'findMany')
      await producerService.findAll(1, 2)
      expect(spy).toHaveBeenCalledWith({ "select": { "document_type": true, "id": true, "name": true }, "skip": 0, "take": 2 })
    })
  })

  describe('findProducer', () => {
    it('should be return producer', async () => {
      const result = await producerService.findOne('42452ab2-e50a-4ed0-9cce-613a6d51851d')
      expect(result).toEqual({ ...mockDb[1], document: '**.100.***/****-**' })
    })

    it('should throw NotFoundException if producer does not exist', async () => {
      const result = producerService.findOne('9a356931-030f-4fda-8377-38239582e810')
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })

  describe('createProducer', () => {
    it('should be create producer', async () => {
      const data: CreateProducerDto = { document: '740.495.890-36', name: 'Sheldon Cooper' }
      const result = await producerService.create(data)
      expect(result).toEqual({
        message: 'Produtor criado com sucesso!',
        producerId: result.producerId,
      })
    })

    it('should throw an error if document is invalid', async () => {
      const data: CreateProducerDto = { name: 'Sheldon Cooper', document: '123.456.789-00' };
      const result = producerService.create(data)
      await expect(result).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if producer with document exists', async () => {
      const data: CreateProducerDto = { name: 'Leonard Hofstadter', document: '48435103000100' };
      const result = producerService.create(data)
      await expect(result).rejects.toThrow(ConflictException);
    });
  })

  describe('updateProducer', () => {
    it('should be update producer', async () => {
      const data: UpdateProducerDto = { name: 'Leonard' }
      const result = await producerService.update('6752b1b0-2464-47d4-a0d3-c399141e5943', data)
      expect(result).toEqual({
        message: 'Produtor editado com sucesso!',
        producerId: result.producerId,
      })
    })

    it('should throw an error if id is invalid when updating', async () => {
      const data: UpdateProducerDto = { name: 'Leonard' }
      const result = producerService.update('5d6ed613-f4b6-4c40-860f-7ca7d2be2286', data)
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })

  describe('updateProducer', () => {
    it('should be delete producer', async () => {
      const result = await producerService.remove('6752b1b0-2464-47d4-a0d3-c399141e5943')
      expect(result).toEqual({
        message: 'Produtor excluído com sucesso!',
        producerId: result.producerId,
      })
    })

    it('should throw an error if id is invalid when deleting', async () => {
      const result = producerService.remove('5d6ed613-f4b6-4c40-860f-7ca7d2be2286')
      await expect(result).rejects.toThrow(NotFoundException)
    })
  })
});
