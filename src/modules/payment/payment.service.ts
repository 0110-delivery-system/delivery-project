import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
    async processPayment(orderId, amount, paymentMethod, cardNumber, expiryDate, cvv) {
        const success = {
            success: true,
            message: '결제가 성공했습니다.',
            paymentId: '12jqmwe11',
        };
        return success;
    }

    async createPaymentInfo(orderId, amount, paymentMethod, cardNumber, expiryDate, cvv) {
        const saveInfo = { orderId, amount, paymentMethod, cardNumber, expiryDate, cvv };
        return saveInfo;
    }

    findOne(id: number) {
        return `This action returns a #${id} payment`;
    }

    update(id: number, updatePaymentDto: UpdatePaymentDto) {
        return `This action updates a #${id} payment`;
    }

    remove(id: number) {
        return `This action removes a #${id} payment`;
    }
}
