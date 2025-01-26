import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInBody {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
