import { Test, TestingModule } from '@nestjs/testing';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';

describe('OwnerService', () => {
  let service: OwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnerService],
    }).compile();

    service = module.get<OwnerService>(OwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('생성하기', () => {
    const input: CreateOwnerDto = {};
    expect(service.create(input)).toBe('This action adds a new owner');
  });
});
