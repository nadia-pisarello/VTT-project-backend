import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entidad/usuario.entity';
import { PersonajeEntity } from 'src/personaje/entidad/personaje.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity, PersonajeEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService],
})
export class UsuarioModule { }
