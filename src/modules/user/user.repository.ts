import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findUserByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async createUser(email: string, password: string, name: string): Promise<void> {
        const user = new User();
        user.email = email;
        user.password = password;
        user.name = name;

        await this.userRepository.save(user);
    }

    async findUserById(userId: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id: userId } });
    }
}
