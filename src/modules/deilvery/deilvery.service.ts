import { Injectable } from '@nestjs/common';
import { CreateDeilveryDto } from './dto/create-deilvery.dto';
import { UpdateDeilveryDto } from './dto/update-deilvery.dto';

@Injectable()
export class DeilveryService {
  create(createDeilveryDto: CreateDeilveryDto) {
    return 'This action adds a new deilvery';
  }

  findAll() {
    return `This action returns all deilvery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deilvery`;
  }

  update(id: number, updateDeilveryDto: UpdateDeilveryDto) {
    return `This action updates a #${id} deilvery`;
  }

  remove(id: number) {
    return `This action removes a #${id} deilvery`;
  }
}
