import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PersonajeService } from './personaje.service';
import { CrearPersonajeDto } from './dto/crear-personaje.dto';
import { UpdatePersonajeDto } from './dto/update-personaje.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Personaje')
@Controller('personaje')
export class PersonajeController {
    constructor(private readonly personajeServ: PersonajeService) { }

    @Post('usuario/:usuarioId')
    create(
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Body() dto: CrearPersonajeDto
    ) {
        return this.personajeServ.createPersonaje(dto, usuarioId);
    }

    @Get('usuario/:usuarioId')
    findAll(
        @Param('usuarioId', ParseIntPipe) usuarioId: number
    ) {
        return this.personajeServ.getAllPersonajesUsuario(usuarioId);
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.personajeServ.getPersonajeById(id);
    }

    @Patch(':id/usuario/:usuarioId')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Body() dto: UpdatePersonajeDto
    ) {
        return this.personajeServ.updatePersonaje(id, dto, usuarioId);
    }

    @Delete(':id/usuario/:usuarioId')
    remove(
        @Param('id', ParseIntPipe) id: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number
    ) {
        return this.personajeServ.deletePersonaje(id, usuarioId);
    }
}
