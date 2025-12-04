import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PartidaService } from './partida.service';
import { CrearPartidaDto } from './dto/crear-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';

@Controller('partida')
export class PartidaController {
    constructor(
        private readonly partidaServ: PartidaService
    ) { }

    @Post('usuario/:usuarioId')
    create(
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Body() dto: CrearPartidaDto
    ) {
        return this.partidaServ.createPartida(dto, usuarioId);
    }

    @Get('usuario/:usuarioId')
    findAll(
        @Param('usuarioId', ParseIntPipe) usuarioId: number
    ) {
        return this.partidaServ.getAllPartidas(usuarioId);
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.partidaServ.getPartidaById(id);
    }

    @Patch(':id/usuario/:usuarioId')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Body() dto: UpdatePartidaDto
    ) {
        return this.partidaServ.updatePartida(id, dto, usuarioId);
    }

    @Delete(':id/usuario/:usuarioId')
    remove(
        @Param('id', ParseIntPipe) id: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number
    ) {
        return this.partidaServ.deletePartida(id, usuarioId);
    }
}
