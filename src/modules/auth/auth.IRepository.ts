export interface IAuthRepository {
  findUserByEmail(email);
}

export const IAuthRepository = Symbol('IAuthRepository');
