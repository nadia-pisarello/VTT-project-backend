import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { CrearPersonajeDto } from './dto/crear-personaje.dto';
import { PersonajeEntity } from './entidad/personaje.entity';
import { UsuarioEntity } from 'src/usuario/entidad/usuario.entity';
import { UpdatePersonajeDto } from './dto/update-personaje.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonajeService {
    constructor(
        @InjectRepository(PersonajeEntity)
        private readonly personajeRepo: Repository<PersonajeEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepo: Repository<UsuarioEntity>,
    ) { }

    async getAllPersonajesUsuario(usuarioId: number): Promise<PersonajeEntity[]> {
        await this.validarUsuario(usuarioId);
        return this.personajeRepo.find({
            where: { usuario: { id: usuarioId } }
        });
    }
    async getPersonajeById(id: number) {
        const personaje = await this.personajeRepo.findOne({ where: { id }, relations: ['usuario'] });
        if (!personaje) {
            throw new NotFoundException(`Personaje no encontrado`);
        }
        return personaje;
    }

    async createPersonaje(dto: CrearPersonajeDto, usuarioId: number) {
        const usuario = await this.validarUsuario(usuarioId);
        const nuevoPersonaje = this.personajeRepo.create({ ...dto, usuario });
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
}
