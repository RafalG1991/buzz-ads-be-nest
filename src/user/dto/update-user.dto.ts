import {IsPhoneNumber, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsPhoneNumber()
  @MinLength(1, {
    message: 'Telephone number cannot be empty',
  })
  @MaxLength(15, {
    message: 'Telephone number cannot be longer than 15 characters'
  })
  tel: string;

  @IsString()
  @MinLength(1, {
    message: 'First name cannot be empty',
  })
  @MaxLength(100, {
    message: 'First name cannot be longer than 100 characters'
  })
  firstName: string;

  @IsString()
  @MinLength(1, {
    message: 'Last name cannot be empty',
  })
  @MaxLength(200, {
    message: 'Last name cannot be longer than 200 characters'
  })
  lastName: string;
}

export class PasswordDto {
  @IsString()
  @MinLength(8, {
    message: 'Password should have at least 8 characters',
  })
  password: string;
}
