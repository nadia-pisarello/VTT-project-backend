import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrearPersonajeDto } from './dto/crear-personaje.dto';
import { PersonajeEntity } from './entidad/personaje.entity';
import { UsuarioEntity } from 'src/usuario/entidad/usuario.entity';
import { UpdatePersonajeDto } from './dto/update-personaje.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PartidaEntity } from 'src/partida/entidad/partida.entity';

@Injectable()
export class PersonajeService {
    constructor(
        @InjectRepository(PersonajeEntity)
        private readonly personajeRepo: Repository<PersonajeEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepo: Repository<UsuarioEntity>,
        @InjectRepository(PartidaEntity)
        private readonly partidaRepo: Repository<PartidaEntity>
    ) { }

    async getPersonajesDePartida(partidaId: number, usuarioId: number) {
        await this.validarUsuario(usuarioId);
        await this.validarPartida(partidaId, usuarioId);
        const personaje = await this.personajeRepo.find({
            where: {
                partida: { id: partidaId },
                usuario: { id: usuarioId }
            }
        });
        return personaje;
    }

    async createPersonaje(dto: CrearPersonajeDto, usuarioId: number, partidaId: number) {
        await this.validarUsuario(usuarioId);
        await this.validarPartida(partidaId, usuarioId);
        const partida = await this.partidaRepo.findOne({
            where: { id: partidaId },
            relations: ['narradorId', 'jugadores']
        });
        const nuevoPersonaje = this.personajeRepo.create({
            ...dto,
            usuario: { id: usuarioId },
            partida: { id: partidaId }
        });
        return this.personajeRepo.save(nuevoPersonaje);
    }

    async updatePersonaje(id: number, dto: UpdatePersonajeDto, usuarioId: number) {
        await this.validarUsuario(usuarioId);
        const personaje = await this.personajeRepo.findOne({
            where: {
                id,
                usuario: { id: usuarioId }
            }
        });
        if (!personaje) {
            throw new NotFoundException(`Personaje no encontrado`);
        }
        Object.assign(personaje, dto);
        return this.personajeRepo.save(personaje);
    }

    async deletePersonaje(id: number, usuarioId: number) {
        await this.validarUsuario(usuarioId);
        const personaje = await this.personajeRepo.findOne({
            where: {
                id, usuario: { id: usuarioId }
            }
        });
        if (!personaje) {
            throw new NotFoundException(`Personaje no encontrado`);
        }
        return this.personajeRepo.remove(personaje);
    }

    private async validarUsuario(usuarioId: number) {
        const usuario = await this.usuarioRepo.findOne({ where: { id: usuarioId } });
        if (!usuario) {
            throw new NotFoundException(`Usuario no encontrado`);
        }
        return usuario;
    }

    private async validarPartida(partidaId: number, usuarioId: number) {
        const partida = await this.partidaRepo.findOne({
            where: { id: partidaId },
            relations: ['narradorId', 'jugadores']
        });
        if (!partida) {
            throw new NotFoundException(`Partida no encontrada`);
        }
        const esNarrador = partida.narradorId.id === usuarioId;
        const esJugador = partida.jugadores.some(jugador => jugador.id === usuarioId);
        if (!esNarrador && !esJugador) {
            throw new ForbiddenException(`El usuario no pertenece a la partida`);
        }
        return partida;
    }
}
