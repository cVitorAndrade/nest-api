import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/UserRepository';
import { hash } from 'bcrypt';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserRequest: CreateUserRequest): Promise<User> {
    const user = new User({
      ...createUserRequest,
      password: await hash(createUserRequest.password, 10),
    });

    await this.userRepository.create(user);
    return user;
  }
}
