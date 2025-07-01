import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AddUserDTO {
    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsStrongPassword({
        minLength: 8
    })
    password!: string;
}