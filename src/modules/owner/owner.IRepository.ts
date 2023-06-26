export interface IOwnerRepository {
    findOneByEmail(email: string);
    createOwner(email: string, password: string, name: string);
}
export const IOwnerRepository = Symbol('IOwnerRepository');
