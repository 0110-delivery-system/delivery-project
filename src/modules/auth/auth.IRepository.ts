export interface IAuthRepository {
    findUserByEmail(email: string);
    createUser(email: string, password: string): Promise<void>;
}

export const IAuthRepository = Symbol("IAuthRepository");
