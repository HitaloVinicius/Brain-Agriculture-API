import { Test, TestingModule } from '@nestjs/testing';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

describe('HarvestController', () => {
  let harvestController: HarvestController;

  const mockHarvestService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [{ provide: HarvestService, useValue: mockHarvestService }],
    }).compile();

    harvestController = module.get<HarvestController>(HarvestController);
  });

  it('should be defined', () => {
    expect(harvestController).toBeDefined();
  });

  it('should create a harvest', async () => {
    const harvestDto: CreateHarvestDto = {
      farm_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9',
      name: 'Safra 2025'
    };
    await harvestController.create(harvestDto);

    expect(mockHarvestService.create).toHaveBeenCalledTimes(1);
    expect(mockHarvestService.create).toHaveBeenCalledWith(harvestDto);
  });

  it('should return harvests', async () => {
    await harvestController.findAll();

    expect(mockHarvestService.findAll).toHaveBeenCalledTimes(1);
    expect(mockHarvestService.findAll).toHaveBeenCalledWith();
  });

  it('should return a harvest', async () => {
    await harvestController.findOne({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' });

    expect(mockHarvestService.findOne).toHaveBeenCalledTimes(1);
    expect(mockHarvestService.findOne).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
  });

  it('should update a harvest', async () => {
    const updateDto: UpdateHarvestDto = {
      name: 'Safra 2024'
    };

    await harvestController.update({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' }, updateDto);

    expect(mockHarvestService.update).toHaveBeenCalledTimes(1);
    expect(mockHarvestService.update).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d', updateDto);
  });

  it('should delete a harvest', async () => {
    await harvestController.remove({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' });

    expect(mockHarvestService.remove).toHaveBeenCalledTimes(1);
    expect(mockHarvestService.remove).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
  });
});
