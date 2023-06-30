export interface IAuthRepository {
    findUserByEmail(email: string);
    createUser(email: string, password: string);
}

export const IAuthRepository = Symbol('IAuthRepository');
