import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class AddUserDTO {
    @IsNumber()
    avatarId!: number;

    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsStrongPassword({
        minLength: 8
    })
    password!: string;
}