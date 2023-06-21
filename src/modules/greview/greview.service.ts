import { Injectable } from '@nestjs/common';
import { CreateGreviewDto } from './dto/create-greview.dto';
import { UpdateGreviewDto } from './dto/update-greview.dto';

@Injectable()
export class GreviewService {
  create(createGreviewDto: CreateGreviewDto) {
    return 'This action adds a new greview';
  }

  findAll() {
    return `This action returns all greview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} greview`;
  }

  update(id: number, updateGreviewDto: UpdateGreviewDto) {
    return `This action updates a #${id} greview`;
  }

  remove(id: number) {
    return `This action removes a #${id} greview`;
  }
}
