import {IsEmail,IsNotEmpty,IsOptional} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({message:'Full Name is required'})
    fullname: string;

    @IsEmail({},{message:'Invalid Email'})
    email: string;

    @IsNotEmpty({message:'Password is required'})
    password: string;
}