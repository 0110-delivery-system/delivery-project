import { Test, TestingModule } from '@nestjs/testing';
import { GreviewController } from './greview.controller';
import { GreviewService } from './greview.service';

describe('GreviewController', () => {
  let controller: GreviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreviewController],
      providers: [GreviewService],
    }).compile();

    controller = module.get<GreviewController>(GreviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
