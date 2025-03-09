import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerDto } from './dto/create-producer.dto';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

describe('ProducerController', () => {
  let producerController: ProducerController;

  const mockProducerService = {
    createProducer: jest.fn().mockReturnValue({ message: 'Produtor criado com sucesso!', producerId: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' }),
    getProducers: jest.fn().mockReturnValue([{
      id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d',
      name: 'Zé Coca Cola',
      document: '56216638000119',
      document_type: 'CNPJ',
      created_at: "2025-03-09T18:40:08.203Z",
      updated_at: "2025-03-09T18:40:08.203Z"
    }]),
    findProducer: jest.fn().mockReturnValue({
      id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d',
      name: 'Zé Coca Cola',
      document: '56216638000119',
      document_type: 'CNPJ',
      created_at: "2025-03-09T18:40:08.203Z",
      updated_at: "2025-03-09T18:40:08.203Z"
    }),
    updateProducer: jest.fn().mockReturnValue({ message: 'Produtor editado com sucesso!', producerId: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' }),
    deleteProducer: jest.fn().mockReturnValue({ message: 'Produtor excluído com sucesso!', producerId: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' }),
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
      name: 'Zé Coca Cola',
      document: '56.216.638/0001-19'
    };
    const mockResponse = { message: 'Produtor criado com sucesso!', producerId: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' }
    const result = await producerController.create(producerDto);

    expect(mockProducerService.createProducer).toHaveBeenCalledTimes(1);
    expect(mockProducerService.createProducer).toHaveBeenCalledWith(producerDto);
    expect(result).toEqual(mockResponse);
  });

  it('should return a producers', async () => {
    const mockProducer = [{
      id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d',
      name: 'Zé Coca Cola',
      document: '56216638000119',
      document_type: 'CNPJ',
      created_at: "2025-03-09T18:40:08.203Z",
      updated_at: "2025-03-09T18:40:08.203Z"
    }];
    const result = await producerController.findAll({ page: 1, per_page: 1 });

    expect(mockProducerService.getProducers).toHaveBeenCalledTimes(1);
    expect(mockProducerService.getProducers).toHaveBeenCalledWith(1, 1);

    expect(result).toEqual(mockProducer);
  });

  it('should return a producer', async () => {
    const mockProducer = {
      id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d',
      name: 'Zé Coca Cola',
      document: '56216638000119',
      document_type: 'CNPJ',
      created_at: "2025-03-09T18:40:08.203Z",
      updated_at: "2025-03-09T18:40:08.203Z"
    };
    const result = await producerController.findOne('55f16d8f-1c20-438a-b3a7-1d64a40b836d');

    expect(mockProducerService.findProducer).toHaveBeenCalledTimes(1);
    expect(mockProducerService.findProducer).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
    expect(result).toEqual(mockProducer);
  });

  it('should update a producer', async () => {
    const updateDto = { name: 'Zé Pepsi' };
    const mockResponse = { message: 'Produtor editado com sucesso!', producerId: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' };

    const result = await producerController.update('55f16d8f-1c20-438a-b3a7-1d64a40b836d', updateDto);

    expect(mockProducerService.updateProducer).toHaveBeenCalledTimes(1);
    expect(mockProducerService.updateProducer).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d', updateDto);
    expect(result).toEqual(mockResponse);
  });

  it('should delete a producer', async () => {
    const mockResponse = { message: 'Produtor excluído com sucesso!', producerId: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' };

    const result = await producerController.remove('55f16d8f-1c20-438a-b3a7-1d64a40b836d');

    expect(mockProducerService.deleteProducer).toHaveBeenCalledTimes(1);
    expect(mockProducerService.deleteProducer).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
    expect(result).toEqual(mockResponse);
  });
});