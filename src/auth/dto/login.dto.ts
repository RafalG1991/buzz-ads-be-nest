import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @MinLength(3, {
    message: 'Email is too short',
  })
  @MaxLength(320, {
    message: 'Email is too long',
  })
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Password should have at least 8 characters',
  })
  password: string;
}
