import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from '../utils/bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        const user: User = await this.userService.create(createUserDto);
        const payload = { sub: user.id, name: user.name, lastname: user.lastname, email: user.email };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
    async signIn({ email, password }: User) {
        const user: User = await this.userService.findOne(email);
        if (!user) throw new UnauthorizedException();
        const isValid = compare(password, user.password);
        if (!isValid) throw new UnauthorizedException();
        const payload = { sub: user.id, name: user.name, lastname: user.lastname, email };
        return { access_token: await this.jwtService.signAsync(payload) };
    }

}
