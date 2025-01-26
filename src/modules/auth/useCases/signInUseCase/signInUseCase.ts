import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user';
import { UserPayload } from '../../models/userPayload';
import { JwtService } from '@nestjs/jwt';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
