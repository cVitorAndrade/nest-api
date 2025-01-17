import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'vitor@email.com',
      name: 'Vitor',
      password: '123456789',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to create user with encrypted password', async () => {
    const userPasswordWithoutEncryptation = '123456789';
    const user = await createUserUseCase.execute({
      email: 'vitor@email.com',
      name: 'Vitor',
      password: '123456789',
    });

    const userHasEncryptedPassword = await compare(
      userPasswordWithoutEncryptation,
      user.password,
    );

    expect(userHasEncryptedPassword).toBeTruthy();
  });
});
