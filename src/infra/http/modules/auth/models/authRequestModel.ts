import { Request } from 'express';
import { User } from 'src/modules/user/entities/user';

export interface AuthRequestModel extends Request {
  user: User;
}
