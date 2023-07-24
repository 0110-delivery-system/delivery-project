import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    findOne(id: number) {
        return `This action returns a #${id} user`;
    }
}
