import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CrearUsuarioDto } from 'src/usuario/dto/crear-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiBody({ type: CrearUsuarioDto })
    @Post('registro')
    registro(@Body() dto: CrearUsuarioDto) {
        return this.authService.registro(dto);
    }

    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('logout')
    async logout() {
        return { message: 'Logged out' };
    }
}
