import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateUserUseCase } from '../useCases/validateUserUseCase/validateUserUseCase';
import { User } from 'src/modules/user/entities/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: ValidateUserUseCase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return await this.validateUserUseCase.execute({
      email,
      password,
    });
  }
}
