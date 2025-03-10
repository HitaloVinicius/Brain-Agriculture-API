import { Test, TestingModule } from '@nestjs/testing';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

describe('CropController', () => {
  let cropController: CropController;

  const mockCropService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [{ provide: CropService, useValue: mockCropService }],

    }).compile();

    cropController = module.get<CropController>(CropController);
  });

  it('should be defined', () => {
    expect(cropController).toBeDefined();
  });

  it('should create a crop', async () => {
    const cropDto: CreateCropDto = {
      harvest_id: '17c0e0b4-bb7a-4590-abcc-40cb7d9290a9',
      name: 'Feijão'
    };
    await cropController.create(cropDto);

    expect(mockCropService.create).toHaveBeenCalledTimes(1);
    expect(mockCropService.create).toHaveBeenCalledWith(cropDto);
  });

  it('should return crop', async () => {
    await cropController.findAll();

    expect(mockCropService.findAll).toHaveBeenCalledTimes(1);
    expect(mockCropService.findAll).toHaveBeenCalledWith();
  });

  it('should return a crop', async () => {
    await cropController.findOne({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' });

    expect(mockCropService.findOne).toHaveBeenCalledTimes(1);
    expect(mockCropService.findOne).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
  });

  it('should update a crop', async () => {
    const updateDto: UpdateCropDto = {
      name: 'Safra 2024'
    };

    await cropController.update({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' }, updateDto);

    expect(mockCropService.update).toHaveBeenCalledTimes(1);
    expect(mockCropService.update).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d', updateDto);
  });

  it('should delete a crop', async () => {
    await cropController.remove({ id: '55f16d8f-1c20-438a-b3a7-1d64a40b836d' });

    expect(mockCropService.remove).toHaveBeenCalledTimes(1);
    expect(mockCropService.remove).toHaveBeenCalledWith('55f16d8f-1c20-438a-b3a7-1d64a40b836d');
  });
});
