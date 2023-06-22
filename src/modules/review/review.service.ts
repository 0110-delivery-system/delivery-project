import { Injectable } from '@nestjs/common';
import { CreatereviewDto } from './dto/create-review.dto';
import { UpdatereviewDto } from './dto/update-review.dto';

@Injectable()
export class reviewService {
    create(createreviewDto: CreatereviewDto) {
        return 'This action adds a new review';
    }

    findAll() {
        return `This action returns all review`;
    }

    findOne(id: number) {
        return `This action returns a #${id} review`;
    }

    update(id: number, updatereviewDto: UpdatereviewDto) {
        return `This action updates a #${id} review`;
    }

    remove(id: number) {
        return `This action removes a #${id} review`;
    }
}
