import { ValidateUserUseCase } from './validateUserUseCase';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { hash } from 'bcrypt';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UnauthorizedException } from '@nestjs/common';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to return user when credentials are correct', async () => {
    const userPasswordWithoutEncryptation = '12345678';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryptation, 10),
    });

    await userRepositoryInMemory.create(user);

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryptation,
    });

    expect(result).toEqual(user);
  });

  it('Should be able to throw error when credentials incorrect', async () => {
    const userPasswordWithoutEncryptation = '12345678';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryptation, 10),
    });

    await userRepositoryInMemory.create(user);

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: userPasswordWithoutEncryptation,
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect_password',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
