import { Test, TestingModule } from '@nestjs/testing';
import { reviewController } from './review.controller';
import { reviewService } from './review.service';

describe('reviewController', () => {
  let controller: reviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [reviewController],
      providers: [reviewService],
    }).compile();

    controller = module.get<reviewController>(reviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
