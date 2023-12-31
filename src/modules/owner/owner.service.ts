import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { isEmailValid, isNameValid, isPasswordValid } from './owner.helper';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { IOwnerRepository } from './owner.IRepository';

@Injectable()
export class OwnerService {
    constructor(@Inject(IOwnerRepository) private ownerRepository: IOwnerRepository) {}
    async getUserByEmail(email: string, withPassword?: boolean): Promise<any> {
        if (!isEmailValid(email)) throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
        const foundOwner = await this.ownerRepository.findOneByEmail(email);
        if (!foundOwner) return foundOwner;
        if (withPassword) return foundOwner;
        else {
            const { password, ...userInfo } = foundOwner;
            return userInfo;
        }
    }

    async createOwner(body: CreateOwnerDto) {
        const { email, password, name } = body;
        if (!isEmailValid(email)) throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
        if (!isPasswordValid(password)) throw new BadRequestException('패스워드는 4~12자여야 합니다.');
        if (!isNameValid(name)) throw new BadRequestException('이름은 4글자 이하 한글만 사용 가능합니다.');

        const existingOwner = await this.getUserByEmail(email, false);

        if (existingOwner) throw new BadRequestException('이미 등록된 이메일입니다.');

        return await this.ownerRepository.createOwner(email, password, name);
    }
}
