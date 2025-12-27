import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PartidaService } from './partida.service';
import { CrearPartidaDto } from './dto/crear-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Partida')
@Controller('partida')
export class PartidaController {
    constructor(
        private readonly partidaServ: PartidaService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('nueva-partida')
    create(
        @Req() req,
        @Body() dto: CrearPartidaDto
    ) {
        const usuarioId = req.user.id;
        return this.partidaServ.createPartida(dto, usuarioId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('solicitar-unirse')
    solicitarUnirse(
        @Req() req,
        @Body('linkAcceso') linkAcceso: string
    ) {
        const usuarioId = req.user.id;
        return this.partidaServ.solicitarUnirse(linkAcceso, usuarioId);
    }

    @Post(':partidaId/solicitud/:usuarioId/aceptar')
    aceptarSolicitud(
        @Param('partidaId', ParseIntPipe) partidaId: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Req() req
    ) {
        const dmId = req.user.id;
        return this.partidaServ.aceptarSolicitud(partidaId, usuarioId, dmId);
    }

    @Post(':partidaId/solicitudes/:usuarioId/rechazar')
    rechazarSolicitud(
        @Param('partidaId', ParseIntPipe) partidaId: number,
        @Param('usuarioId', ParseIntPipe) usuarioId: number,
        @Req() req
    ) {
        const dmId = req.user.id;
        return this.partidaServ.rechazarSolicitud(partidaId, usuarioId, dmId);
    }

    @Get()
    findAll(@Req() req) {
        const usuarioId = req.user.id;
        return this.partidaServ.getAllPartidas(usuarioId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':partidaId')
    findOne(
        @Req() req,
        @Param('partidaId', ParseIntPipe) partidaId: number
    ) {
        const usuarioId = req.user.id;
        return this.partidaServ.obtjenerPartida(partidaId, usuarioId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':partidaId/actualizar-partida')
    update(
        @Param('partidaId', ParseIntPipe) partidaId: number,
        @Req() req,
        @Body() dto: UpdatePartidaDto
    ) {
        const usuarioId = req.user.id
        return this.partidaServ.updatePartida(partidaId, dto, usuarioId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('partidaId/eliminar-partida')
    remove(
        @Param('id', ParseIntPipe) id: number,
        @Req() req
    ) {
        const usuarioId = req.user.id
        return this.partidaServ.deletePartida(id, usuarioId);
    }
}
