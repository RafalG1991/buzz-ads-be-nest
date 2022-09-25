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
  password: string;
}
