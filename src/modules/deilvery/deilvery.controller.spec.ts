import { Test, TestingModule } from '@nestjs/testing';
import { DeilveryController } from './deilvery.controller';
import { DeilveryService } from './deilvery.service';

describe('DeilveryController', () => {
  let controller: DeilveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeilveryController],
      providers: [DeilveryService],
    }).compile();

    controller = module.get<DeilveryController>(DeilveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
