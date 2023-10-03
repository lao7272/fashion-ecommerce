import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInData } from 'src/types/Types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }
    async validate(signInData: SignInData): Promise<any> {
        const user = await this.authService.validateUser(signInData);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}
