import { Test, TestingModule } from '@nestjs/testing';
import { reviewService } from './review.service';

describe('reviewService', () => {
    let service: reviewService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [reviewService],
        }).compile();

        service = module.get<reviewService>(reviewService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
