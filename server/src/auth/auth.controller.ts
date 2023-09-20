import { Body , Req, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Post('register')
    signUp(@Body() createUserDto: CreateUserDto){
        return this.authService.signUp(createUserDto);
    }
    @Post('login')
    signIn(@Body() user: User){
        return this.authService.signIn(user);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
        return req['user']
    }
}
