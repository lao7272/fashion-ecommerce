import { Body , Request, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('auth/register')
    signUp(@Body() createUserDto: CreateUserDto){
        return this.authService.signUp(createUserDto);
    }
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async signIn(@Request() req){
        return this.authService.signIn(req.user);
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
