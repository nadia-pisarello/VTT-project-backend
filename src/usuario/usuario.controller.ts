import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post('crear')
    create(@Body() dto: CrearUsuarioDto) {
        return this.usuarioService.create(dto);
    }

    @Get()
    findAll() {
        return this.usuarioService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/mi-perfil')
    findOne(@Req() req) {
        const id = req.user.id;
        return this.usuarioService.findOne(id);
    }

    @Get('email/:email')
    findByEmail(@Param('email') email: string) {
        return this.usuarioService.findByEmail(email);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('editar-perfil')
    update(
        @Req() req,
        @Body() dto: UpdateUsuarioDto
    ) {
        const id = req.user.id;
        return this.usuarioService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('eliminar-cuenta')
    remove(
        @Req() req
    ) {
        const id = req.user.id;
        return this.usuarioService.remove(id);
    }
}
