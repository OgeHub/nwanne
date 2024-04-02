import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(3)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(11,14)
    phone: string;


    @IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }, {message: 'Password should be at least 8 characters made of at least a lowercase, uppercase, number, and symbol'})
    @IsNotEmpty()
    password: string;


    role?: string;
  }