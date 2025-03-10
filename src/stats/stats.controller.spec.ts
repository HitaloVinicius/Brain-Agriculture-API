import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

describe('StatsController', () => {
  let statsController: StatsController;

  const mockStatsService = {
    getStats: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [{ provide: StatsService, useValue: mockStatsService }],
    }).compile();

    statsController = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(statsController).toBeDefined();
  });

  it('should return stats', async () => {
    await statsController.stats();

    expect(mockStatsService.getStats).toHaveBeenCalledTimes(1);
    expect(mockStatsService.getStats).toHaveBeenCalledWith();
  });
});
