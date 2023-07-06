export interface IUserRepository {
    findUserById(userId: number);
}

export const IUserRepository = Symbol('IUserRepository');
