import {
    IsEmail,
    IsString,
    MinLength,
    IsNotEmpty,
    Matches,
    IsInt
} from 'class-validator';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$?%^&*+-]{8,20}$/;
export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(2, { message: 'Lastname must have atleast 2 characters.' })
    @IsNotEmpty()
    lastname: string;

    @IsInt()
    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(passwordPattern, {
        message: `Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and `,
    })
    password: string;

}
