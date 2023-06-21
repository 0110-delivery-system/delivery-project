import { Test, TestingModule } from '@nestjs/testing';
import { DeilveryService } from './deilvery.service';

describe('DeilveryService', () => {
  let service: DeilveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeilveryService],
    }).compile();

    service = module.get<DeilveryService>(DeilveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
