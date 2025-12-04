import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entidad/usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) { }

    async create(dto: CrearUsuarioDto) {
        const existe = await this.usuarioRepository.findOne({ where: { email: dto.email.toLowerCase() } });
        if (existe) {
            throw new BadRequestException('El email ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const nuevoUsuario = this.usuarioRepository.create({
            ...dto,
            password: hashedPassword,
        });
        return this.usuarioRepository.save(nuevoUsuario);
    }
    async findAll() {
        return this.usuarioRepository.find({ relations: ['personajes'] });
    }
    async findOne(id: number) {
        const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['personajes'] });
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }
    async update(id: number, dto: UpdateUsuarioDto) {
        const usuario = await this.usuarioRepository.findOne({ where: { id } });
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        const actualizado = Object.assign(usuario, dto);
        return this.usuarioRepository.save(actualizado);
    }
    async remove(id: number) {
        const usuario = await this.findOne(id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return this.usuarioRepository.remove(usuario);
    }
}
