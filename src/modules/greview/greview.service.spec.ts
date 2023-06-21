import { Test, TestingModule } from '@nestjs/testing';
import { GreviewService } from './greview.service';

describe('GreviewService', () => {
  let service: GreviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GreviewService],
    }).compile();

    service = module.get<GreviewService>(GreviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
