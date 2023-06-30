import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { IAuthRepository } from "./auth.IRepository";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

export class FakeAuthRepository implements IAuthRepository {
    async findUserByEmail(email: any) {
        if (email === "test@email.com")
            return {
                id: 1,
                email: "teset@email.com",
                password: await bcrypt.hash("1234", 10),
            };
    }
    createUser(email: string, password: string): Promise<void> {
        return;
    }
}

describe("AuthService", () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, { provide: IAuthRepository, useClass: FakeAuthRepository }, JwtService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(authService).toBeDefined();
    });

    describe("signUp", () => {
        it("validateEmail()이 true가 아닌 경우 - 실패", async () => {
            const email = "testemail.com";
            const password = "1234";
            const email2 = "test@email.com";

            await expect(authService.signUp(email, password)).rejects.toThrowError(new BadRequestException("이메일 형식이 올바르지 않습니다"));
            await expect(authService.signUp(email2, password)).rejects.toThrowError(new BadRequestException("이미 존재하는 이메일 입니다"));
        });

        it("validatePassword가 true가 아닌 경우 - 실패", async () => {
            const email = "test1@email.com";
            const password = "123";
            const password2 = "1234567890123";

            await expect(authService.signUp(email, password)).rejects.toThrowError(new BadRequestException("비밀번호가 형식에 맞지 않습니다"));
            await expect(authService.signUp(email, password2)).rejects.toThrowError(new BadRequestException("비밀번호가 형식에 맞지 않습니다"));
        });

        it("검증을 전부 통과하였을 경우 - 성공", async () => {
            const email = "test1@email.com";
            const password = "1234";

            const result = await authService.signUp(email, password);
            expect(result).toEqual(undefined);
        });
    });

    describe("validateEmail() - 이메일 검증", () => {
        it("이메일에 @가 들어가지 않을 경우", async () => {
            const email = "testemail.com";
            await expect(authService.validateEmail(email)).rejects.toThrowError(new BadRequestException("이메일 형식이 올바르지 않습니다"));
        });

        it("이미 존재하는 이메일일 경우", async () => {
            const email = "test@email.com";
            await expect(authService.validateEmail(email)).rejects.toThrowError(new BadRequestException("이미 존재하는 이메일 입니다"));
        });

        it("이메일에 @가 포함되고 존재하지 않는 이메일일 경우 - 성공", async () => {
            const email = "alstjq@email.com";
            const result = await authService.validateEmail(email);
            expect(result).toEqual(true);
        });
    });

    describe("validatePassword() - 비밀번호 검증", () => {
        it("비밀번호가 4자 미만인 경우 - 실패", () => {
            const password1 = "1";
            const password2 = "12";
            const password3 = "123";
            expect(() => {
                authService.validatePassword(password1);
            }).toThrow("비밀번호가 형식에 맞지 않습니다");

            expect(() => {
                authService.validatePassword(password2);
            }).toThrow("비밀번호가 형식에 맞지 않습니다");

            expect(() => {
                authService.validatePassword(password3);
            }).toThrow("비밀번호가 형식에 맞지 않습니다");
        });

        it("비밀번호가 12자 초과일 경우 - 실패", () => {
            const password1 = "1234567890123";
            const password2 = "12345678901234";
            const password3 = "123456789012345";

            expect(() => {
                authService.validatePassword(password1);
            }).toThrow("비밀번호가 형식에 맞지 않습니다");

            expect(() => {
                authService.validatePassword(password2);
            }).toThrow("비밀번호가 형식에 맞지 않습니다");

            expect(() => {
                authService.validatePassword(password3);
            }).toThrow("비밀번호가 형식에 맞지 않습니다");
        });
    });

    it("validatePassword - 성공", () => {
        const password1 = "1234";
        const password2 = "12345";
        const password3 = "123456";
        const password4 = "1234567";
        const password5 = "12345678";
        const password6 = "123456789";
        const password7 = "1234567890";
        const password8 = "12345678901";
        const password9 = "123456789012";

        expect(authService.validatePassword(password1)).toEqual(true);
        expect(authService.validatePassword(password2)).toEqual(true);
        expect(authService.validatePassword(password3)).toEqual(true);
        expect(authService.validatePassword(password4)).toEqual(true);
        expect(authService.validatePassword(password5)).toEqual(true);
        expect(authService.validatePassword(password6)).toEqual(true);
        expect(authService.validatePassword(password7)).toEqual(true);
        expect(authService.validatePassword(password8)).toEqual(true);
        expect(authService.validatePassword(password9)).toEqual(true);
    });

    describe("login", () => {
        it("일치하는 이메일이 존재하지 경우 - 실패", async () => {
            const email = "test999@email.com";
            const password = "1234";
            await expect(authService.login(email, password)).rejects.toThrowError(new BadRequestException("계정 정보가 올바르지 않습니다"));
        });

        it("이메일의 비밀번호와 입력받은 비밀번호가 일치하지 않을 경우 - 실패", async () => {
            const email = "test@email.com";
            const password = "12345";
            await expect(authService.login(email, password)).rejects.toThrowError(new BadRequestException("계정 정보가 올바르지 않습니다"));
        });

        it("성공적으로 로그인을 했을 경우 (access_token과 refresh_token을 받아야 한다) - 성공", async () => {
            const email = "test@email.com";
            const password = "1234";
            const result = await authService.login(email, password);
            expect(result).toHaveProperty("access_token");
            expect(result).toHaveProperty("refresh_token");
        });
    });

    describe("jwtGenerate", () => {
        it("access_token이 제대로 발급되는지 확인 - 성공", () => {
            const userId = 1;
            const result = authService.jwtGenerate(userId, "access_token");
            expect(typeof result).toEqual("string");
        });

        it("refresh_token이 제대로 발급되는지 확인 - 성공", () => {
            const userId = 1;
            const result = authService.jwtGenerate(userId, "refresh_token");
            expect(typeof result).toEqual("string");
        });
    });
});
