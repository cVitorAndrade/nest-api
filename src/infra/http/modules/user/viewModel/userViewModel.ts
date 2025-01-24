import { User } from 'src/modules/user/entities/user';

export class UserViewModel {
  static toHttp({ id, email, name, createdAt }: User) {
    return {
      id,
      email,
      name,
      createdAt,
    };
  }
}
