import { Test, TestingModule } from '@nestjs/testing';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';

describe('FarmController', () => {
  let farmController: FarmController;

  const mockFarmService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [{ provide: FarmService, useValue: mockFarmService }]

    }).compile();

    farmController = module.get<FarmController>(FarmController);
  });

  it('should be defined', () => {
    expect(farmController).toBeDefined();
  });

  it('should create a farm', async () => {
    const farmDto: CreateFarmDto = {
      producer_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9',
      name: 'Rancho Skywalker',
      city: 'Mossoró',
      state: 'RN',
      total_area: 100,
      vegetation_area: 30,
      agricultural_area: 50
    };
    await farmController.create(farmDto);

    expect(mockFarmService.create).toHaveBeenCalledTimes(1);
    expect(mockFarmService.create).toHaveBeenCalledWith(farmDto);
  });

  it('should return farms', async () => {
    await farmController.findAll({ page: 1, per_page: 1 });

    expect(mockFarmService.findAll).toHaveBeenCalledTimes(1);
    expect(mockFarmService.findAll).toHaveBeenCalledWith(1, 1);
  });

  it('should return a farm', async () => {
    await farmController.findOne({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' });

    expect(mockFarmService.findOne).toHaveBeenCalledTimes(1);
    expect(mockFarmService.findOne).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
  });

  it('should update a farm', async () => {
    const updateDto: UpdateFarmDto = {
      name: 'Rancho Skywalker',
      city: 'Mossoró',
      state: 'RN',
      total_area: 100,
      vegetation_area: 30,
      agricultural_area: 50
    };

    await farmController.update({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' }, updateDto);

    expect(mockFarmService.update).toHaveBeenCalledTimes(1);
    expect(mockFarmService.update).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d', updateDto);
  });

  it('should delete a farm', async () => {
    await farmController.remove({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' });

    expect(mockFarmService.remove).toHaveBeenCalledTimes(1);
    expect(mockFarmService.remove).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
  });
});
