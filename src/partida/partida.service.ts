import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartidaEntity } from './entidad/partida.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/entidad/usuario.entity';
import { UpdatePartidaDto } from './dto/update-partida.dto';

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
        const nuevaPartida = this.partidaRepo.create({ ...dto, narradorId: usuario });
        return this.partidaRepo.save(nuevaPartida);
    }

    async getAllPartidas(usuarioId: number): Promise<PartidaEntity[]> {
        await this.validarUsuario(usuarioId);
        return this.partidaRepo.find({
            where: { narradorId: { id: usuarioId } }
        });
    }

    async getPartidaById(id: number): Promise<PartidaEntity> {
        const partida = await this.partidaRepo.findOne({ where: { id }, relations: ['narradorId'] });
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
