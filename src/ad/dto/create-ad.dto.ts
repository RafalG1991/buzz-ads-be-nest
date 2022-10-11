import {IsDate, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength} from "class-validator";

export class CreateAdDto {
  @IsString()
  @MinLength(3, {
    message: 'Title is too short. Should contain at least 3 characters',
  })
  @MaxLength(50, {
    message: 'Title is too long. Should contain not more than 50 characters',
  })
  title: string;

  @IsString()
  @MinLength(10, {
    message: 'Description is too short. Should contain at least 10 characters',
  })
  @MaxLength(2000, {
    message: 'Description is too long. Should contain not more than 2000 characters',
  })
  content: string;

  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'The street name should contain at least 3 characters',
  })
  @MaxLength(100, {
    message: 'The street name is too long. Should contain not more than 100 characters',
  })
  street: string | null;

  @IsString()
  @MinLength(1, {
    message: 'The city name should contain at least 1 character',
  })
  @MaxLength(100, {
    message: 'The city name is too long. Should contain not more than 100 characters',
  })
  city: string;

  @IsString()
  @MinLength(1, {
    message: 'Postal code cannot be empty',
  })
  @MaxLength(12, {
    message: 'The postal code is too long. Should contain not more than 12 characters',
  })
  postalCode: string;

  @IsString()
  @MinLength(1, {
    message: 'The apartment or building number cannot be empty',
  })
  @MaxLength(20, {
    message: 'The apartment or building number is too long. Should contain not more than 20 characters',
  })
  apNumber: string;

  @IsString()
  @MinLength(1, {
    message: 'Coordinates cannot be empty',
  })
  @MaxLength(50, {
    message: 'Coordinates are too long. Should contain not more than 50 characters',
  })
  coordinates: string;

  @IsNumber()
  @Min(0, {
    message: 'The price cannot be less than zero',
  })
  @Max(999999.99, {
    message: 'Price cannot be greater than 999,999.99',
  })
  price: number;
}
