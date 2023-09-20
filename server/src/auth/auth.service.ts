import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { compare } from '../utils/bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signUp(createUserDto: CreateUserDto) {
        const user:User = await this.userService.create(createUserDto);
        const payload = { sub: user.id, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
    async signIn({ email, password }: User) {
        const user: User = await this.userService.findOne(email);
        if (!user) throw new UnauthorizedException();
        const isValid = compare(password, user.password);
        if (!isValid) throw new UnauthorizedException();
        const payload = { sub: user.id, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

}
