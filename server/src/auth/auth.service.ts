import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from '../utils/bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { SignInData } from 'src/types/Types';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async signUp(createUserDto: CreateUserDto) {
        const user: User = await this.userService.create(createUserDto);
        const payload = { sub: user.id, name: user.name, lastname: user.lastname, email: user.email };
        const { password, ...result } = user;
        return {
            access_token: this.jwtService.sign(payload),
            user: {result}
        }
    }
    async validateUser({ email, password }: SignInData) {
        const user: User = await this.userService.findOne(email);
        if (!user) return null;
        const isValid = compare(password, user.password);
        if (!isValid) return null;
        const { password: pass, ...result } = user;
        return result;
    }
    async signIn(user: any) {
        const payload = { sub: user.id, name: user.name, lastname: user.lastname, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
