import { Test, TestingModule } from '@nestjs/testing';
import { OwnerService } from './owner.service';
import { IOwnerRepository } from './owner.IRepository';
import { BadRequestException } from '@nestjs/common';

export class MockOwnerRepository implements IOwnerRepository {
    async findOneByEmail(email: string): Promise<any> {
        const ownerInfo = {
            id: 1,
            ownerEmail: 'taesikyoon@naver.com',
            password: 1234,
        };
        if (email === 'taesikyoon@naver.com') return ownerInfo;

        return null;
    }

    async createOwner(email: string, password: string, name: string): Promise<void> {
        return;
    }
}

describe('OwnerService', () => {
    let ownerService: OwnerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OwnerService,
                {
                    provide: IOwnerRepository,
                    useClass: MockOwnerRepository,
                },
            ],
        }).compile();
        ownerService = module.get<OwnerService>(OwnerService);
    });

    it('should be defined', () => {
        expect(ownerService).toBeDefined();
    });

    describe('사장 정보를 제공한다.', () => {
        it('존재하는 사장의 이메일로 조회하면 성공적으로 사장의 정보를 제공한다.(패스워드 요청 함) - 성공', async () => {
            const ownerEmail = 'taesikyoon@naver.com';
            const withPassword = true;

            const expectedResult = {
                id: 1,
                ownerEmail: 'taesikyoon@naver.com',
                password: 1234,
            };

            expect(await ownerService.getUserByEmail(ownerEmail, withPassword)).toEqual(expectedResult);
        });

        it('존재하는 사장의 이메일로 조회하면 성공적으로 사장의 정보를 제공한다.(패스워드 요청 안함) - 성공', async () => {
            const ownerEmail = 'taesikyoon@naver.com';
            const withPassword = false;

            const expectedResult = {
                id: 1,
                ownerEmail: 'taesikyoon@naver.com',
            };

            expect(await ownerService.getUserByEmail(ownerEmail, withPassword)).toEqual(expectedResult);
        });
        it('존재하지 않는 사장의 이메일로 조회하면 null이 나온다.(패스워드 요청과 관계없음) - 성공', async () => {
            const ownerEmail = 'test@naver.com';
            const withPassword = true;

            expect(await ownerService.getUserByEmail(ownerEmail, withPassword)).toBeNull();
        });

        it('올바른 이메일 형식을 입력하지 않으면 실패한다.(이메일 정규식 = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i) - 실패', async () => {
            const ownerEmail = 'test.com';
            const withPassword = true;

            await expect(async () => {
                await ownerService.getUserByEmail(ownerEmail, withPassword);
            }).rejects.toThrow(new BadRequestException('이메일 형식이 올바르지 않습니다.'));
        });
    });
    describe('사장 정보를 생성/저장한다.', () => {
        it('사장 정보를 생성/저장한다. (조건에 부합함, 유효한 이메일, 패스워드, 이름 사용) - 성공', async () => {
            const ownerEmail = 'test@naver.com';
            const ownerPassword = 'kingMoonsik';
            const ownerName = '김문식';

            expect(await ownerService.createOwner(ownerEmail, ownerPassword, ownerName)).toBeUndefined();
        });

        it('올바른 이메일 형식을 입력하지 않으면 실패한다.(이메일 정규식 = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i) - 실패', async () => {
            const ownerEmail = 'test.com';
            const ownerPassword = 'kingMoonsik';
            const ownerName = '김문식';

            await expect(async () => {
                await ownerService.createOwner(ownerEmail, ownerPassword, ownerName);
            }).rejects.toThrow(new BadRequestException('이메일 형식이 올바르지 않습니다.'));
        });

        it('중복된 이메일을 사용하면 실패한다. - 실패', async () => {
            const ownerEmail = 'taesikyoon@naver.com';
            const ownerPassword = 'kingMoonsik';
            const ownerName = '김문식';

            await expect(async () => {
                await ownerService.createOwner(ownerEmail, ownerPassword, ownerName);
            }).rejects.toThrow(new BadRequestException('이미 등록된 이메일입니다.'));
        });

        it('올바른 패스워드 형식을 입력하지 않으면 실패한다.(패스워드 형식 = 4글자 이상 12글자 이하) - 실패', async () => {
            const ownerEmail = 'test@naver.com';
            const ownerPassword = 'kingMoonsik123';
            const ownerName = '김문식';

            await expect(async () => {
                await ownerService.createOwner(ownerEmail, ownerPassword, ownerName);
            }).rejects.toThrow(new BadRequestException('패스워드는 4~12자여야 합니다.'));
        });

        it('올바른 이름 형식을 입력하지 않으면 실패한다.(이름 정규식 = /^[가-힣]+$/,이름 형식 = 4글자 이하) - 실패', async () => {
            const ownerEmail = 'test@naver.com';
            const ownerPassword = 'kingMoonsik';
            const ownerName = '김문식이1';

            await expect(async () => {
                await ownerService.createOwner(ownerEmail, ownerPassword, ownerName);
            }).rejects.toThrow(new BadRequestException('이름은 4글자 이하 한글만 사용 가능합니다.'));
        });
    });
});

// - 음식점 정보 등록 Unit ( createStore() )
//     - 준비물: DB (store(column), owner)

//     성공

//     - DB에 음식점 정보를 등록한다
//     - 실패
//         - 존재하지 않는 Owner일 경우
//         - Owner나 store 이름 등 필요한 값이 존재하지 않을 경우
//     - 음식정 정보 검증 Unit (validateStore() )
//         - 준비물: DB (store)
//         - 성공
//             - 음식점 정보 검증에 성공했을 경우
//         - 실패
//             - 이미 존재하는 음식점일 경우
//             - Owner나 store 이름 등 필요한 값이 존재하지 않을 경우
// - 메뉴 정보 등록 Unit ( createMenu() )
//     - 준비물: DB (store(owner), menu)
//     - 성공
//         - 메뉴 정보 등록에 성공했을 경우
//     - 실패
//         - 존재하지 않는 store일 경우
//         - 메뉴 정보 검증에 실패했을 경우
//         - 결제방식이 신용카드가 아닐 경우
//     - 메뉴 정보 검증 Unit ( validateMenu() )
//         - 준비물: DB (menu)
//         - 성공
//             - 주문 정보 검증에 성공했을 경우
//         - 실패
//             - store나 menu 이름 등 필요한 값이 존재하지 않을 경우
//             - 이미 존재하는 메뉴일 경우
