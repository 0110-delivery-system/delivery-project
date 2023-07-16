export interface IUserRepository {
    findUserById(userId: number);
    findUserByEmail(email: string);
    createUser(email: string, password: string, name: string);
}

export const IUserRepository = Symbol('IUserRepository');
