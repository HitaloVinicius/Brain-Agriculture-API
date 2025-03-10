import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerDto } from './dto/create-producer.dto';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

describe('ProducerController', () => {
  let producerController: ProducerController;

  const mockProducerService = {
    createProducer: jest.fn(),
    getProducers: jest.fn(),
    findProducer: jest.fn(),
    updateProducer: jest.fn(),
    deleteProducer: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [{ provide: ProducerService, useValue: mockProducerService }]
    }).compile();

    producerController = module.get<ProducerController>(ProducerController);
  });

  it('should be defined', () => {
    expect(producerController).toBeDefined();
  });

  it('should create a producer', async () => {
    const producerDto: CreateProducerDto = {
      name: 'Stuart Bloom',
      document: '39.133.681/0001-00'
    };
    await producerController.create(producerDto);

    expect(mockProducerService.createProducer).toHaveBeenCalledTimes(1);
    expect(mockProducerService.createProducer).toHaveBeenCalledWith(producerDto);
  });

  it('should return producers', async () => {
    await producerController.findAll({ page: 1, per_page: 1 });

    expect(mockProducerService.getProducers).toHaveBeenCalledTimes(1);
    expect(mockProducerService.getProducers).toHaveBeenCalledWith(1, 1);
  });

  it('should return a producer', async () => {
    await producerController.findOne({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' });
    expect(mockProducerService.findProducer).toHaveBeenCalledTimes(1);
    expect(mockProducerService.findProducer).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
  });

  it('should update a producer', async () => {
    const updateDto = { name: 'Stuart Bloom' };
    await producerController.update({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' }, updateDto);
    expect(mockProducerService.updateProducer).toHaveBeenCalledTimes(1);
    expect(mockProducerService.updateProducer).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d', updateDto);
  });

  it('should delete a producer', async () => {
    await producerController.remove({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' });
    expect(mockProducerService.deleteProducer).toHaveBeenCalledTimes(1);
    expect(mockProducerService.deleteProducer).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
  });
});