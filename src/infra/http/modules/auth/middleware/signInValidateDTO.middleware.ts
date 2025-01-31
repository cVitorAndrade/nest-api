import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInBody } from '../dtos/signInBody';
import { validate } from 'class-validator';

@Injectable()
export class SignInValidateDTOMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInBody();
    signInBody.email = body.email;
    signInBody.password = body.password;

    const validations = await validate(signInBody);
    const haveError = validations.length;
    if (haveError) throw new BadRequestException(validations);

    next();
  }
}
