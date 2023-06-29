import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';

class mockRepository {
    async findOne() {
        return 1;
    }
    async save() {
        return;
    }
}
describe('PaymentService', () => {
    let service: PaymentService;
    let repository: mockRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PaymentService, mockRepository],
        }).compile();

        service = module.get<PaymentService>(PaymentService);
        repository = module.get<mockRepository>(mockRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });
    it('결제 성공', async () => {
        const orderId = '123456';
        const amount = 10000;
        const paymentMethod = 'credit_card';
        const cardNumber = '1234567890123456';
        const expiryDate = '12/24';
        const cvv = '123';

        const result = await service.processPayment(orderId, amount, paymentMethod, cardNumber, expiryDate, cvv);

        expect(result.success).toBe(true);
        expect(result.message).toBe('결제가 성공했습니다.');
        expect(result.paymentId).toBeDefined();
    });

    // it('결제 실패 사유를 모르겠어요', async () => {
    //     const orderId = '123456';
    //     const amount = -10000;
    //     const paymentMethod = 'credit_card';
    //     const cardNumber = '1234567890123456';
    //     const expiryDate = '12/24';
    //     const cvv = '123';

    //     const result = await service.processPayment(orderId, amount, paymentMethod, cardNumber, expiryDate, cvv);

    //     expect(result.success).toBe(false);
    //     expect(result.message).toBe('Payment failed');
    //     expect(result.error).toBeDefined();
    // });

    it('저장 성공', async () => {
        const orderId = '123456';
        const amount = 10000;
        const paymentMethod = 'credit_card';
        const cardNumber = '1234567890123456';
        const expiryDate = '12/24';
        const cvv = '123';

        const saveInfo = {
            orderId,
            amount,
            paymentMethod,
            cardNumber,
            expiryDate,
            cvv,
        };

        const result = await service.createPaymentInfo(orderId, amount, paymentMethod, cardNumber, expiryDate, cvv);

        expect(result).toEqual(saveInfo);
    });
});
