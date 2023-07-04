import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OwnerRepository } from './owner.repositioy';
import { isEmailValid, isNameValid, isPasswordValid } from './owner.helper';

@Injectable()
export class OwnerService {
    constructor(@Inject(OwnerRepository) private readonly ownerRepository: OwnerRepository) {}
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

    async createOwner(email: string, password: string, name: string) {
        if (!isEmailValid(email)) throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
        if (!isPasswordValid(password)) throw new BadRequestException('패스워드는 4~12자여야 합니다.');
        if (!isNameValid(name)) throw new BadRequestException('이름은 4글자 이하 한글만 사용 가능합니다.');

        const existingOwner = await this.getUserByEmail(email, false);

        if (existingOwner) throw new BadRequestException('이미 등록된 이메일입니다.');

        await this.ownerRepository.createOwner(email, password, name);
    }
}
