import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PersonajeService } from './personaje.service';
import { CrearPersonajeDto } from './dto/crear-personaje.dto';
import { UpdatePersonajeDto } from './dto/update-personaje.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Personaje')
@Controller('personaje')
export class PersonajeController {
    constructor(private readonly personajeServ: PersonajeService) { }

    @Post('partida/:partidaId/usuario/:usuarioId')
    create(
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Param('partidaId', ParseIntPipe) partidaId: number,
        @Body() dto: CrearPersonajeDto
    ) {
        return this.personajeServ.createPersonaje(dto, usuarioId, partidaId);
    }

    @Get('partida/:partidaId/usuario/:usuarioId/mis-personajes')
    findByPartida(
        @Param('partidaId', ParseIntPipe) partidaId: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number
    ) {
        return this.personajeServ.getPersonajesDePartida(partidaId, usuarioId);
    }

    @Patch(':personajeId/usuario/:usuarioId')
    update(
        @Param('personajeId', ParseIntPipe) personajeId: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Body() dto: UpdatePersonajeDto
    ) {
        return this.personajeServ.updatePersonaje(personajeId, dto, usuarioId);
    }

    @Delete(':personajeId/usuario/:usuarioId')
    remove(
        @Param('personajeId', ParseIntPipe) personajeId: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number
    ) {
        return this.personajeServ.deletePersonaje(personajeId, usuarioId);
    }
}
