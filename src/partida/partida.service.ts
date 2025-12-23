import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartidaEntity } from './entidad/partida.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/entidad/usuario.entity';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PartidaService {
    constructor(
        @InjectRepository(PartidaEntity)
        private readonly partidaRepo: Repository<PartidaEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepo: Repository<UsuarioEntity>
    ) { }

    async createPartida(dto: Partial<PartidaEntity>, usuarioId: number): Promise<PartidaEntity> {
        const usuario = await this.validarUsuario(usuarioId);
        const nuevaPartida = this.partidaRepo.create({
            ...dto,
            narradorId: usuario,
            linkAcceso: randomUUID(),
            jugadores: [],
            solicitudesPendientes: [],
            rutasMapas: []
        });
        return this.partidaRepo.save(nuevaPartida);
    }

    async getAllPartidas(usuarioId: number): Promise<PartidaEntity[]> {
        await this.validarUsuario(usuarioId);
        return this.partidaRepo.find({
            where: { narradorId: { id: usuarioId } }
        });
    }

    async getPartidaById(id: number): Promise<PartidaEntity> {
        const partida = await this.partidaRepo.findOne({ where: { id }, relations: ['narradorId', 'jugadores'] });
        if (!partida) {
            throw new NotFoundException(`Partida no encontrada`);
        }
        return partida;
    }

    async updatePartida(id: number, dto: UpdatePartidaDto, usuarioId: number): Promise<PartidaEntity> {
        await this.validarUsuario(usuarioId);
        const partida = await this.validarPartida(id, usuarioId);
        Object.assign(partida, dto);
        return this.partidaRepo.save(partida);
    }

    async deletePartida(id: number, usuarioId: number): Promise<PartidaEntity> {
        await this.validarUsuario(usuarioId);
        const partida = await this.validarPartida(id, usuarioId);
        return this.partidaRepo.remove(partida);
    }

    async solicitarUnirse(linkAcceso: string, usuarioId: number) {
        const usuario = await this.validarUsuario(usuarioId);
        const partida = await this.partidaRepo.findOne({ where: { linkAcceso }, relations: ['jugadores'] });
        if (!partida) {
            throw new NotFoundException(`Partida no encontrada`);
        }
        if (partida.jugadores.some(jugador => jugador.id === usuario.id)) {
            throw new BadRequestException(`El usuario ya es jugador de la partida`);
        }
        if (partida.solicitudesPendientes.some(solicitud => solicitud.usuarioId === usuario.id)) {
            throw new BadRequestException(`El usuario ya tiene una solicitud pendiente para unirse a la partida`);
        }
        partida.solicitudesPendientes.push({ usuarioId: usuario.id, nombreUsuario: usuario.nombre });
        return this.partidaRepo.save(partida);
    }

    async aceptarSolicitud(partidaId: number, solicitanteId: number, dmId: number) {
        const partida = await this.validarPartida(partidaId, dmId);
        if (partida.narradorId.id !== dmId) {
            throw new BadRequestException(`Solo el narrador puede aceptar solicitudes`);
        }
        const index = partida.solicitudesPendientes.findIndex(solicitud => solicitud.usuarioId === solicitanteId);
        if (index === -1) {
            throw new NotFoundException(`Solicitud no encontrada`);
        }
        const usuario = await this.validarUsuario(solicitanteId);
        partida.solicitudesPendientes.splice(index, 1);
        partida.jugadores.push(usuario);
        return this.partidaRepo.save(partida);
    }

    async rechazarSolicitud(partidaId: number, solicitanteId: number, dmId: number) {
        const partida = await this.validarPartida(partidaId, dmId);
        if (partida.narradorId.id !== dmId) {
            throw new BadRequestException(`Solo el narrador puede rechazar solicitudes`);
        }
        const index = partida.solicitudesPendientes.findIndex(solicitud => solicitud.usuarioId === solicitanteId);
        if (index === -1) {
            throw new NotFoundException(`Solicitud no encontrada`);
        }
        partida.solicitudesPendientes.splice(index, 1);
        return this.partidaRepo.save(partida);
    }

    private async validarUsuario(usuarioId: number): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepo.findOne({ where: { id: usuarioId } });
        if (!usuario) {
            throw new NotFoundException(`Usuario no encontrado`);
        }
        return usuario;
    }

    private async validarPartida(partidaId: number, usuarioId: number): Promise<PartidaEntity> {
        const partida = await this.partidaRepo.findOne({ where: { id: partidaId, narradorId: { id: usuarioId } } });
        if (!partida) {
            throw new NotFoundException(`Partida no encontrada`);
        }
        return partida;
    }

}
