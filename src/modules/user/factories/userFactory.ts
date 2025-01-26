import { User } from '../entities/user';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override): User => {
  return new User(
    {
      email: 'vitor@email.com',
      name: 'vitor',
      password: '12345678',
      ...override,
    },
    id,
  );
};
