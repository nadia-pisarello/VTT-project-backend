import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PersonajeService } from './personaje.service';
import { CrearPersonajeDto } from './dto/crear-personaje.dto';
import { UpdatePersonajeDto } from './dto/update-personaje.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Personaje')
@ApiBearerAuth()
@Controller('personaje')
export class PersonajeController {
    constructor(private readonly personajeServ: PersonajeService) { }

    @UseGuards(JwtAuthGuard)
    @Post('partida/:partidaId')
    create(
        @Param('partidaId', ParseIntPipe) partidaId: number,
        @Req() req,
        @Body() dto: CrearPersonajeDto
    ) {
        const usuarioId = req.user.id;
        return this.personajeServ.createPersonaje(dto, usuarioId, partidaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('partida/:partidaId/mis-personajes')
    findByPartida(
        @Param('partidaId', ParseIntPipe) partidaId: number,
        @Req() req
    ) {
        const usuarioId = req.user.id;
        return this.personajeServ.getPersonajesDePartida(partidaId, usuarioId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':personajeId/modificar-personaje')
    update(
        @Param('personajeId', ParseIntPipe) personajeId: number,
        @Req() req,
        @Body() dto: UpdatePersonajeDto
    ) {
        const usuarioId = req.user.id;
        return this.personajeServ.updatePersonaje(personajeId, dto, usuarioId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':personajeId/eliminar-personaje')
    remove(
        @Param('personajeId', ParseIntPipe) personajeId: number,
        @Req() req
    ) {
        const usuarioId = req.user.id;
        return this.personajeServ.deletePersonaje(personajeId, usuarioId);
    }
}


