import { User } from 'src/modules/user/entities/user';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({ email, name, createdAt, id, password }: User): UserRaw {
    return {
      email,
      name,
      createdAt,
      id,
      password,
    };
  }

  static toDomain({ id, email, name, password, createdAt }: UserRaw): User {
    return new User(
      {
        email,
        name,
        password,
        createdAt,
      },
      id,
    );
  }
}
